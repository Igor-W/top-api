import { Injectable } from '@nestjs/common';
import { ProductModel, ProductModelDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductModelDocument>,
  ) {}
}
