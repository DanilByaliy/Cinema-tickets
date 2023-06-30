import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { FilesModule } from 'src/files/files.module';
import { EmailsModule } from 'src/emails/emails.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FilesModule,
    EmailsModule,
    SessionsModule,
    TicketsModule,
    ConfigModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
