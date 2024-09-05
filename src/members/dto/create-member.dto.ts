import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from "class-validator";
import { Role } from "../entities/member.entity";

export class CreateMemberDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    pass: string;

    @IsString()
    @IsOptional()
    phone: number;

    @IsString()
    @IsOptional()
    picture: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;

}
