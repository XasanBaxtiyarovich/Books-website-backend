import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    new_password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    confirm_password: string;
}