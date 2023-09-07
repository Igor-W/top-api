import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  TopLevelCategory,
  TopPageModel,
  TopPageModelDocument,
} from './top-page.model';
import { Model, Types } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageModelDocument>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(new Types.ObjectId(id)).exec();
  }
  async findByText(text: string) {
    return this.topPageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  async updateById(id: string, dto: TopPageModel) {
    return this.topPageModel
      .findByIdAndUpdate(new Types.ObjectId(id), dto, {
        new: true,
      })
      .exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate([
        {
          $match: {
            firstLevelCategory: firstCategory,
          },
        },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' },
            pages: {
              $push: { alias: '$alias', title: '$title' },
            },
          },
        },
      ])
      .exec();
    // return this.topPageModel.find(
    //   { firstLevelCategory: firstCategory },
    //   { alias: 1, secondCategory: 1, title: 1, category: 1 },
    // );
  }
}
