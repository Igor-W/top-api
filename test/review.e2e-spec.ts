import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDot: CreateReviewDto = {
  name: 'Test',
  description: 'Text description',
  title: 'Header',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', (done) => {
    request(app.getHttpServer())
      .post('/review/create')
      .send(testDot)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });
  it('/review/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDot, rating: 0 })
      .expect(400);
  });
  it('/review/byProduct/:productId (GET)', (done) => {
    request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        console.log(body);
        expect(body.length).toBe(1);
        done();
      });
  });
  it('/review/byProduct/:productId (GET) - fail', (done) => {
    request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        console.log(body);
        expect(body.length).toBe(0);
        done();
      });
  });

  it('/review/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200);
  });
  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(404);
  });

  afterAll(() => {
    disconnect();
  });
});
