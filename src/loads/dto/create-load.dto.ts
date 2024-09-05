import { IsOptional, IsString } from "class-validator";


export class CreateLoadDto {

    @IsOptional()
    @IsString()
    equipment?: string;

    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsOptional()
    pickup_date?: string;

    @IsOptional()
    delivery_date?: string;

}
