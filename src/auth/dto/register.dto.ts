import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {

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