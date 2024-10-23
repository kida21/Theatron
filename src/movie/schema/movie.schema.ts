import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsNotEmpty, Min } from "class-validator";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Movie{
    @Prop({type:SchemaTypes.ObjectId,auto:true})
    _id:Types.ObjectId
    @Prop({ required: [true,'title must not be empty'] })
    title: string
    @Prop({required:[true,' a description is a required field']})
    description: string
    @Prop({ required: [true,'genre must be provided']})
    genre: string
    @Prop({
        required: true,
        default:Date.now()
    })
    @IsDate()
    releaseDate: Date
    @Prop({required:true})
    imageData: string
    @Prop({required:true})
    cast: [string]
    @Prop({ required: [true, 'price must not be empty'] })
    @Min(1)
    price:Number
    @Prop({
        required: true,
        default:Date.now()
    })
    createdAt:Date
    @Prop({
        required: true,
        default:Date.now()
    })
    UpdatedAt:Date
    
}
export const MovieSchema = SchemaFactory.createForClass(Movie);