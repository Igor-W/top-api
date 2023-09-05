import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsNumber()
  @Max(5)
  @Min(1, { message: 'Is my custom error' })
  rating: number;

  @IsString()
  productId: string;
}
