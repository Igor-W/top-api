import { Injectable } from '@nestjs/common';
import { ReviewModel, ReviewModelDocument } from './review.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  /**
   *
   */

  constructor(
    @InjectModel(ReviewModel.name)
    private reviewModel: Model<ReviewModelDocument>,
  ) {}
}
