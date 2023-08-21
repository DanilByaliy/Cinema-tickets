import { Module } from '@nestjs/common';
import { TrailersController } from './trailers.controller';
import { TrailersService } from './trailers.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [TrailersController],
  providers: [TrailersService],
})
export class TrailersModule {}
