import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { Role } from '../entities/member.entity';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {

    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    pass?: string;

    @IsString()
    @IsOptional()
    phone?: number;

    @IsString()
    @IsOptional()
    picture?: string;

    @IsOptional()
    role?: Role;

}
