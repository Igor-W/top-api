import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Controller('top-page')
export class TopPageController {
  /**
   *
   */
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage)
      throw new NotFoundException("Didn't find top page with this id");
    return topPage;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage)
      throw new NotFoundException("Couldn't delete top page with this id");
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage)
      throw new NotFoundException("Didn't find top page with this id");
    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() { firstCategory }: FindTopPageDto) {
    return this.topPageService.findByCategory(firstCategory);
  }
  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
