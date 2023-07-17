import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs';
import { IConsumer } from './consumer.interface';
import { KafkaConsumer } from './kafka.consumer';
import { DeadLetterQueueMessage } from 'src/kafka/schemas/dead-letter-queue-message.schema';

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    @InjectModel(DeadLetterQueueMessage.name)
    private deadLetterQueueModel: Model<DeadLetterQueueMessage>,
    private readonly configService: ConfigService,
  ) {}

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkaConsumer<DeadLetterQueueMessage>(
      topic,
      this.deadLetterQueueModel,
      config,
      this.configService.get('KAFKA_BROKER'),
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
