import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Session } from './session.entity';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), MoviesModule],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
