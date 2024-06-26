import { IsNumber, IsString } from 'class-validator';

export class catsDto{
    @IsString()
    name:string;

    @IsString()
    breed:string;

    @IsNumber()
    age:number;

    @IsString()
    userId:number;
}