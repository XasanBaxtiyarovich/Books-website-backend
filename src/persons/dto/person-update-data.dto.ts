import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateDataDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}