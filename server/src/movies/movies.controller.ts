import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createMovie(
    @Body() body: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.moviesService.create(body, file);
  }

  @Get('/:id')
  findMovie(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @CacheTTL(60000)
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
