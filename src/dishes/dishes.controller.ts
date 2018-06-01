import {
  Get,
  Post,
  Body,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';
import { Dish } from './interfaces/dish.interface';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  async findAll(): Promise<Dish[]> {
    return this.dishesService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDishDto: CreateDishDto) {
    this.dishesService.create(createDishDto);
  }
}
