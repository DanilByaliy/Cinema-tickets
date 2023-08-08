import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SessionsModule } from './sessions/sessions.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { Movie } from './movies/movie.entity';
import { Session } from './sessions/session.entity';
import { Ticket } from './tickets/ticket.entity';
import { User } from './users/user.entity';
import { FilesModule } from './files/files.module';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { OrdersModule } from './orders/orders.module';
import { SeatSelectionModule } from './seat-selection/seat-selection.module';
import { join } from 'path';
import { TrailersModule } from './trailers/trailers.module';
import * as redisStore from 'cache-manager-redis-store';

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
          entities: [Movie, Session, Ticket, User],
        };
      },
    }),
    CacheModule.register({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          url: config.get('REDIS_URL'),
          max: 100,
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
    UsersModule,
    OrdersModule,
    SeatSelectionModule,
    TrailersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailsService],
})
export class AppModule {}
