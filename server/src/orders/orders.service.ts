import { Injectable } from '@nestjs/common';
import { EmailsService } from 'src/emails/emails.service';
import { FilesService } from 'src/files/files.service';
import { OrderDto } from './dtos/order.dto';
import { SessionsService } from 'src/sessions/sessions.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import { Seat } from 'src/interfaces/seat.interface';

@Injectable()
export class OrdersService {
  constructor(
    private ticketsService: TicketsService,
    private sessionsService: SessionsService,
    private filesService: FilesService,
    private emailsService: EmailsService,
  ) {}

  async makeOrder(order: OrderDto) {
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

    this.createPDFTicketsAndSend(order.customer, info, seats);
  }

  async createPDFTicketsAndSend(
    recipient: string,
    info: TicketInfo,
    seats: Seat[],
  ) {
    const files = await this.filesService.createPDFs(info, seats);
    this.emailsService.send(recipient, files);
  }
}
