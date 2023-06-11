import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private repo: Repository<Movie>,
    private filesService: FilesService,
  ) {}

  async create(movieDto: CreateMovieDto, file: Express.Multer.File) {
    const fileName = await this.filesService.saveFile(file);

    const movie = this.repo.create({ ...movieDto, picture: fileName });
    return this.repo.save(movie);
  }

  async findOne(id: string) {
    const movie = await this.repo.findOne({
      where: { id },
      relations: { sessions: true },
    });
    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`);
    return movie;
  }

  async find(page: number) {
    const take = 2;
    const skip = (page - 1) * 2;

    const [result, total] = await this.repo.findAndCount({
      relations: { sessions: true },
      order: { title: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
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
