import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dtos/create-session.dto';
import { UpdateSessionDto } from './dtos/update-session.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SessionDto } from './dtos/session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Serialize(SessionDto)
  @Post()
  createSession(@Body() body: CreateSessionDto) {
    return this.sessionsService.create(body);
  }

  @Get('/:id')
  findSession(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Get()
  findAllSessions() {
    return this.sessionsService.find();
  }

  @Patch('/:id')
  updateSession(@Param('id') id: string, @Body() body: UpdateSessionDto) {
    return this.sessionsService.update(id, body);
  }

  @Delete('/:id')
  removeSession(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
