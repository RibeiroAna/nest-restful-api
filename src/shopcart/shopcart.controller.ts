import {
  Controller,
  Post,
} from '@nestjs/common';
import { ShopcartService } from './shopcart.service';

@Controller('shopcart')
export class ShopcartController {
  constructor(private readonly shopcartService: ShopcartService) {}

  @Post()
  async addItem(): Promise<string> {
    return this.shopcartService.addItem();
  }
}
