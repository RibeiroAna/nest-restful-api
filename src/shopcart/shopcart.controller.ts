import {
  Controller,
  Post,
} from '@nestjs/common';
import { ShopcartService } from './shopcart.service';

@Controller('shopcart')
export class ShopcartController {
  constructor(private readonly shopcartService: ShopcartService) {}

  @Post()
  async find(): Promise<string> {
    return this.shopcartService.find();
  }
}
