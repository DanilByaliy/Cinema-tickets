import { Body, Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { FeedbackDto } from './dtos/feedback.dto';

@Controller()
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Post('feedback')
  sendFeedback(@Body() body: FeedbackDto) {
    return this.emailsService.sendFeedback(body);
  }
}
