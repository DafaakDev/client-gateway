import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { IsEnum } from 'class-validator';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
