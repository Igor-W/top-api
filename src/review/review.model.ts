import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type ReviewModelDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  productId: mongoose.Schema.Types.ObjectId;
}
export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
