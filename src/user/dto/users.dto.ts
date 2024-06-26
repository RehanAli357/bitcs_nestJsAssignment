import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class userDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @Optional()
  @IsString()
  token: string;

  @Optional()
  @IsNumber()
  level:number;
}
