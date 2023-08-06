import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import { IConsumer } from './consumer.interface';
import { sleep } from './utils/sleep';
import * as retry from 'async-retry';
import { Model } from 'mongoose';

export class KafkaConsumer<T> implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    private readonly deadLetterQueueModel: Model<T>,
    config: ConsumerConfig,
    broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topic}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic);
    await this.processMessages(onMessage);
  }

  async processMessages(
    onMessage: (message: KafkaMessage) => Promise<void>,
  ): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await this.retryMessageProcessing(onMessage, message);
        } catch (err) {
          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err,
          );
          await this.addMessageToDlq(message);
        }
      },
    });
  }

  async retryMessageProcessing(
    onMessage: (message: KafkaMessage) => Promise<void>,
    message: KafkaMessage,
  ): Promise<void> {
    await retry(async () => onMessage(message), {
      retries: 3,
      onRetry: (error, attempt) =>
        this.logger.error(
          `Error consuming message, executing retry ${attempt}/3...`,
          error,
        ),
    });
  }

  private async addMessageToDlq(message: KafkaMessage) {
    const newDeadLetterQueue = new this.deadLetterQueueModel({
      value: message.value,
      topic: this.topic.topic,
    });
    newDeadLetterQueue.save();
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}