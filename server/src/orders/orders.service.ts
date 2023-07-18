import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailsService } from 'src/emails/emails.service';
import { FilesService } from 'src/files/files.service';
import { OrderDto } from './dtos/order.dto';
import { SessionsService } from 'src/sessions/sessions.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { ConsumerService } from 'src/kafka/consumer.service';
import { ProducerService } from 'src/kafka/producer.service';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import { Seat } from 'src/interfaces/seat.interface';
import { PaymentRequest } from 'src/orders/dtos/payment-request.dto';
import Stripe from 'stripe';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly STRIPE_KEY = this.configService.get('STRIPE_KEY');
  private stripe: Stripe;

  constructor(
    private ticketsService: TicketsService,
    private sessionsService: SessionsService,
    private filesService: FilesService,
    private emailsService: EmailsService,
    private configService: ConfigService,
    private readonly consumerService: ConsumerService,
    private readonly producerService: ProducerService,
  ) {
    this.stripe = new Stripe(this.STRIPE_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'order' },
      config: { groupId: 'order-consumer' },
      onMessage: async (message) => {
        await this.completeOrder(
          JSON.parse(message.value.toString()) as OrderDto,
        );
      },
    });
  }

  async makeOrder(order: OrderDto) {
    await this.producerService.produce('order', {
      value: JSON.stringify(order),
    });
  }

  async completeOrder(order: OrderDto) {
    const { sessionId, seats } = order;
    const {
      time,
      date,
      movie: { title, poster },
    } = await this.sessionsService.findOneIncludesMovie(sessionId);
    const info = { time, date, title, poster };

    for (const seat of seats) {
      await this.ticketsService.create({ ...seat, sessionId });
    }

    await this.createPDFTicketsAndSend(order.customer, info, seats);
  }

  private async createPDFTicketsAndSend(
    recipient: string,
    info: TicketInfo,
    seats: Seat[],
  ) {
    const files = await this.filesService.createPDFTickets(info, seats);
    this.emailsService.send(recipient, files);
  }

  createPayment(paymentRequest: PaymentRequest) {
    const { quantity, ticketPrice, currency } = paymentRequest;
    const amount = quantity * ticketPrice * 100;

    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
