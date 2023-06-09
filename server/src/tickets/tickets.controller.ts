import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { TicketDto } from './dtos/ticket.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Serialize(TicketDto)
  @Post()
  createTicket(@Body() body: CreateTicketDto) {
    return this.ticketsService.create(body);
  }

  @Get('/:id')
  findTicket(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Get()
  findAllTickets() {
    return this.ticketsService.find();
  }

  @Delete('/:id')
  removeTicket(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
