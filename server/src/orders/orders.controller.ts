import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dtos/order.dto';
import { PaymentRequestBody } from 'src/interfaces/payment-request-body.interface';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async makeOrder(@Body() body: OrderDto) {
    await this.ordersService.makeOrder(body);
  }

  @Post('/payment')
  createPayment(@Body() paymentRequestBody: PaymentRequestBody) {
    return this.ordersService.createPayment(paymentRequestBody);
  }
}
