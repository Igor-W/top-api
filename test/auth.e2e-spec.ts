import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { disconnect } from 'mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const loginDto: AuthDto = {
    login: 'q@q.com',
    password: '1',
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });
  it('/auth/login (POST) - fail email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '123' })
      .expect(401);
  });
  it('/auth/login (POST) - fail login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'ss@ww.com' })
      .expect(401);
  });

  afterAll(() => {
    disconnect();
  });
});
