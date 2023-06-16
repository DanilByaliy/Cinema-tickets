import { Injectable } from '@nestjs/common';
import { EmailsService } from 'src/emails/emails.service';
import { FilesService } from 'src/files/files.service';
import { OrderDto } from './dtos/order.dto';
import { SessionsService } from 'src/sessions/sessions.service';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import { File } from 'src/interfaces/file.interface';
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
    let info: Info;

    const session = await this.sessionsService.findOneIncludesMovie(
      order.sessionId,
    );
    info.time = session.time;
    info.date = session.date;
    info.movie = session.movie.title;
    info.image = session.movie.picture;

    for (const seat of order.seats) {
      await this.ticketsService.create({
        ...seat,
        session_id: order.sessionId,
      });
    }

    this.createPDFTicketsAndSend(order.customer, info, order.seats);
  }

  async createPDFTicketsAndSend(recipient: string, info: Info, seats: Seat[]) {
    const files: File[] = [];

    for (const seat of seats) {
      const ticketInfo = { ...seat, ...info };
      const file = await this.filesService.createPDF(ticketInfo as TicketInfo);
      files.push(file);
    }

    await this.emailsService.send(recipient, files);
  }
}
