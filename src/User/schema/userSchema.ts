import { IsEmail, IsNotEmpty, Min } from "@nestjs/class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
    @Prop({type:SchemaTypes.ObjectId,auto:true})
    _id:Types.ObjectId
    @Prop({ required: true })
    @IsNotEmpty()
    FirstName: string;
    @Prop({ required: true })
    @IsNotEmpty()
    LastName: string;
    @Prop({ required: true})
    @IsNotEmpty()
    @Min(8)
    password: string
    @Prop({ required: true, unique: true })
    @IsEmail()
    email:string
    
}

export const UserSchema = SchemaFactory.createForClass(User);