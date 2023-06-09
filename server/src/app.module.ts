import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SessionsModule } from './sessions/sessions.module';
import { TicketsModule } from './tickets/tickets.module';
import { Movie } from './movies/movie.entity';
import { Session } from './sessions/session.entity';
import { Ticket } from './tickets/ticket.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          synchronize: true,
          entities: [Movie, Session, Ticket],
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MoviesModule,
    SessionsModule,
    TicketsModule,
    FilesModule,
    EmailsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailsService],
})
export class AppModule {}
