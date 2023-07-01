import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dtos/order.dto';
import { PaymentRequest } from 'src/orders/dtos/payment-request.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async makeOrder(@Body() body: OrderDto) {
    await this.ordersService.makeOrder(body);
  }

  @Post('/payment')
  createPayment(@Body() paymentRequest: PaymentRequest) {
    return this.ordersService.createPayment(paymentRequest);
  }
}
