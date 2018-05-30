import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';

@Module({
  imports: [],
  controllers: [DishesController],
  providers: [DishesService]
})
export class AppModule {}
