import { IsString, IsInt } from 'class-validator';

export class CreateDishDto {
  @IsString() readonly name: string;

  @IsInt() readonly price: number;
}
