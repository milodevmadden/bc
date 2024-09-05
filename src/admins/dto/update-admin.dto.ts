import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

    @IsString()
    @IsOptional()
    @MinLength(1)
    username?: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    pass?: string;

    @IsEmail()
    @IsOptional()
    @MinLength(1)
    email?: string;

}
