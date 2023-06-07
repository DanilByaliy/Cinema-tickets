import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  create(movieDto: CreateMovieDto) {
    const movie = this.repo.create(movieDto);
    return this.repo.save(movie);
  }

  async findOne(id: string) {
    const movie = await this.repo.findOneBy({ id });
    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`);
    return movie;
  }

  find() {
    return this.repo.find();
  }

  async update(id: string, attrs: Partial<Movie>) {
    const movie = await this.findOne(id);
    Object.assign(movie, attrs);
    return this.repo.save(movie);
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    return this.repo.remove(movie);
  }
}
