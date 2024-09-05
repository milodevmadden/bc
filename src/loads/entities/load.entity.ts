import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Load extends Document{

    @Prop()
    equipment: string;

    @Prop({
        required: true
    })
    origin: string;

    @Prop({
        required: true
    })
    destination: string;

    @Prop()
    pickup_date: string;

    @Prop()
    delivery_date: string;

}

export const LoadSchema = SchemaFactory.createForClass(Load)