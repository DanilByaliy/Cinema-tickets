import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionsService } from 'src/sessions/sessions.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private repo: Repository<Ticket>,
    private sessionsService: SessionsService,
  ) {}

  async create(body: CreateTicketDto) {
    const { sessionId } = body;
    const session = await this.sessionsService.findOne(sessionId);
    const ticket = this.repo.create(body);
    ticket.session = session;
    return this.repo.save(ticket);
  }

  async findOne(id: string) {
    const ticket = await this.repo.findOne({
      where: { id },
      relations: { session: true },
    });
    if (!ticket) throw new NotFoundException(`Ticket with id: ${id} not found`);
    return ticket;
  }

  find() {
    return this.repo.find();
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.repo.remove(ticket);
  }
}
