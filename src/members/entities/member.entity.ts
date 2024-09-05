import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Role {
    DRIVER = 'DRIVER',
    OWNER = 'OWNER'
}


@Schema({ timestamps: true })
export class Member extends Document{

    @Prop({
        required: true
    })
    username: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    phone: string;

    @Prop()
    picture: string;

    @Prop({
        required: true,
        enum: Role,
        type: String
    })
    role: Role;

}

export const MemberSchema = SchemaFactory.createForClass(Member)

