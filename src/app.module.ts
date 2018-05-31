import { Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';
import { ShopcartController } from './shopcart/shopcart.controller';
import { ShopcartService } from './shopcart/shopcart.service';
import { AuthenticationMiddleware } from './common/middlewares/authentication.middleware';

@Module({
  imports: [],
  controllers: [DishesController, ShopcartController],
  providers: [DishesService, ShopcartService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(AuthenticationMiddleware).forRoutes(
            { path: '/shopcart', method: RequestMethod.POST }
    );
  }
}
