import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserModelDocument } from './user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModelDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(USER_NOT_FOUND);
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) throw new UnauthorizedException(WRONG_PASSWORD);
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
