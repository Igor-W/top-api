import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewModelSchema } from './review.model';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewModelSchema },
    ]),
    TelegramModule,
  ],
})
export class ReviewModule {}
