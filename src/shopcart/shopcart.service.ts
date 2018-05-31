import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopcartService {

  find(): string {
    return "If you get this message, it means that you are an identified user";
  }
}
