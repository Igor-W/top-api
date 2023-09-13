import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
  /**
   *
   */
  constructor(
    private readonly revieService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}
  @Get()
  async get() {
    return this.revieService.get();
  }
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.revieService.create(dto);
  }
  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message =
      `Name: ${dto.name}\n` +
      `Title: ${dto.title}\n` +
      `Description: ${dto.description}\n` +
      `Raiting: ${dto.rating}\n` +
      `Product id: ${dto.productId}\n`;
    return this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.revieService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    return this.revieService.findByProductId(productId);
  }
}
