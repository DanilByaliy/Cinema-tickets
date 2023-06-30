import { Module } from '@nestjs/common';
import { SeatSelectionGateway } from './seat-selection.gateway';

@Module({
  providers: [SeatSelectionGateway],
})
export class SeatSelectionModule {}
