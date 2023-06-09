import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async makeOrder(@Body() body: OrderDto) {
    await this.ordersService.makeOrder(body);
  }
}
