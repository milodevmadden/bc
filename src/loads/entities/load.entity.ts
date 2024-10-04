import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Load extends Document{

    @Prop()
    load_id: string;

    @Prop()
    equipment: string;

    @Prop()
    origin: string;

    @Prop()
    destination: string;

    @Prop()
    pickup_date: string;

    @Prop()
    delivery_date: string;

    @Prop()
    customer: string;

    @Prop()
    phone: string;

    @Prop()
    rate: string;

    @Prop({
        default: false
    })
    old: boolean;

}

export const LoadSchema = SchemaFactory.createForClass(Load)