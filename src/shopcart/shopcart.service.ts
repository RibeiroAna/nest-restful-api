import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopcartService {

  addItem(): string {
    return 'This is a fake service :D';
  }
}
