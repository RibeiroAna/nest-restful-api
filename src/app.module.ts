import { Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ShopcartController } from './shopcart/shopcart.controller';
import { ShopcartService } from './shopcart/shopcart.service';
import { AuthenticationMiddleware } from './common/authentication.middleware';

@Module({
  imports: [AuthenticationMiddleware],
  controllers: [ItemsController, ShopcartController],
  providers: [ItemsService, ShopcartService]
})
export class AppModule implements NestModule {}
