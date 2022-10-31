import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput
  ) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  getOrder(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
