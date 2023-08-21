import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeadLetterQueueMessage,
  DeadLetterQueueMessageSchema,
} from './schemas/dead-letter-queue-message.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: DeadLetterQueueMessage.name,
        schema: DeadLetterQueueMessageSchema,
      },
    ]),
  ],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
