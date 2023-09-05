import { Injectable } from '@nestjs/common';
import { ReviewModel, ReviewModelDocument } from './review.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
  /**
   *
   */

  constructor(
    @InjectModel(ReviewModel.name)
    private reviewModel: Model<ReviewModelDocument>,
  ) {}

  async get() {
    return this.reviewModel.find();
  }

  async create({
    name,
    title,
    description,
    rating,
    productId,
  }: CreateReviewDto): Promise<ReviewModelDocument> {
    const newReview = new this.reviewModel({
      name,
      title,
      description,
      rating,
      productId,
    });
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewModelDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModelDocument[]> {
    const res = this.reviewModel.find({ productId }).exec();
    return res;
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}
