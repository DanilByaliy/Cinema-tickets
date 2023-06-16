import { Injectable } from '@nestjs/common';
import { EmailsService } from 'src/emails/emails.service';
import { FilesService } from 'src/files/files.service';
import { OrderDto } from './dtos/order.dto';
import { SessionsService } from 'src/sessions/sessions.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { Info } from 'src/interfaces/info.interface';
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
      movie: { title, picture },
    } = await this.sessionsService.findOneIncludesMovie(sessionId);
    const info = { time, date, movie: title, image: picture };

    for (const seat of seats) {
      await this.ticketsService.create({
        ...seat,
        session_id: sessionId,
      });
    }

    this.createPDFTicketsAndSend(order.customer, info, seats);
  }

  async createPDFTicketsAndSend(recipient: string, info: Info, seats: Seat[]) {
    const files = await Promise.all(
      seats.map((seat) => this.filesService.createPDF({ ...seat, ...info })),
    );

    this.emailsService.send(recipient, files);
  }
}
