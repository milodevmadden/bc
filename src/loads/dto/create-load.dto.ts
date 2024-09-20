import { IsOptional, IsString } from "class-validator";


export class CreateLoadDto {

    @IsOptional()
    @IsString()
    load_id?: string;

    @IsOptional()
    @IsString()
    equipment?: string;

    @IsOptional()
    @IsString()
    origin?: string;

    @IsOptional()
    @IsString()
    destination?: string;

    @IsOptional()
    @IsString()
    pickup_date?: string;

    @IsOptional()
    @IsString()
    delivery_date?: string;

    @IsOptional()
    @IsString()
    customer?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    rate?: string;

    @IsOptional()
    @IsString()
    sender_email?: string;

    @IsOptional()
    @IsString()
    sender?: string;
}
