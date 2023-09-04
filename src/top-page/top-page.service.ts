import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageModel, TopPageModelDocument } from './top-page.model';
import { Model } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageModelDocument>,
  ) {}
}
