import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DeadLetterQueueMessage extends Document {
  @Prop()
  value: string;

  @Prop()
  topic: string;
}

export const DeadLetterQueueMessageSchema = SchemaFactory.createForClass(
  DeadLetterQueueMessage,
);
