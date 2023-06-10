import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @Get('/:id')
  findMovie(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Get()
  findAllMovies(@Query('page') page: string) {
    return this.moviesService.find(parseInt(page));
  }

  @Patch('/:id')
  updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(id, body);
  }

  @Delete('/:id')
  removeMovie(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
