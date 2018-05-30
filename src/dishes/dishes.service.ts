import { Injectable } from '@nestjs/common';
import { Dish } from './interfaces/dish.interface';

@Injectable()
export class DishesService {
  private readonly dishes: Dish[] = [];

  findAll(): Dish[] {
    return this.dishes;
  }

  create(dish: Dish) {
    this.dishes.push(dish);
  }
}
