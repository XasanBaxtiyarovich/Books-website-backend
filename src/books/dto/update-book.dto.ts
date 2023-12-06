import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBookDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    pages: number;
  
    @IsNotEmpty()
    year: number;
  
    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    country: string;
  
    @IsString()
    @IsNotEmpty()
    author: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    category: string;
  
    @IsString()
    @IsNotEmpty()
    nashriyot: string;
}