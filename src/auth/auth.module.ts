import { getJWTConfig } from './../configs/jwt.config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.stratagy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
