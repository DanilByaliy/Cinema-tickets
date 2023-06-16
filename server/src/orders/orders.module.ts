import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { FilesModule } from 'src/files/files.module';
import { EmailsModule } from 'src/emails/emails.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [FilesModule, EmailsModule, SessionsModule, TicketsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
