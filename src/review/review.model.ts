import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewModelDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
  // _id: string;
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  createdAt: Date;
}
export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
