import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { CreateSessionDto } from './dtos/create-session.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private repo: Repository<Session>,
    private moviesService: MoviesService,
  ) {}

  async create(body: CreateSessionDto) {
    const { movie_id } = body;
    const movie = await this.moviesService.findOne(movie_id);
    const session = this.repo.create(body);
    session.movie = movie;
    return this.repo.save(session);
  }

  async findOne(id: string) {
    const session = await this.repo.findOneBy({ id });
    if (!session)
      throw new NotFoundException(`Session with id: ${id} not found`);
    return session;
  }

  find() {
    return this.repo.find();
  }

  async update(id: string, attrs: Partial<Session>) {
    const session = await this.findOne(id);
    Object.assign(session, attrs);
    return this.repo.save(session);
  }

  async remove(id: string) {
    const session = await this.findOne(id);
    return this.repo.remove(session);
  }
}
