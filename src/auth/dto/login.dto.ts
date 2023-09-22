import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(16)
    @MinLength(8)
    hash: string

}