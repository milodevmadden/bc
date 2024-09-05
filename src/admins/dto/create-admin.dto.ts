import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @MinLength(1)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    pass: string;

}
