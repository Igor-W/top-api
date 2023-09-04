import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel, AuthModelDocument } from './auth.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthModelDocument>,
  ) {}
}
