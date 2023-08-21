import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  HttpStatus,
  Header,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { statSync } from 'fs';
import { Headers } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

@Controller('trailers')
export class TrailersController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':id/stream')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const videoPath = `videos/${encodeURIComponent(id)}.mp4`;
    const { size } = statSync(videoPath);
    const headersVideoRange = headers.range || '';
    const videoRange = this.filesService.parseVideoRange(
      headersVideoRange,
      size,
    );
    const stream = this.filesService.getStream(videoPath, videoRange);

    if (videoRange) {
      const { start, end, chunksize } = videoRange;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, headers);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head);
    }
    stream.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('movieId') movieId: string,
  ) {
    return this.filesService.saveVideo(file, movieId);
  }

  @Get()
  findAll() {
    return this.filesService.getFileNames('videos');
  }

  @Get(':id')
  deleteOne(@Param('id') id: string) {
    return this.filesService.removeVideo(id);
  }
}
