import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Admin extends Document {

    @Prop({
        required: true
    })
    username: string;

    @Prop({
        unique: true,
        required: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        required: true
    })
    role: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin)
