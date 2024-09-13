/*
 * @Author: wangxuan wangxuan
 * @Date: 2024-08-16 13:34:10
 * @LastEditors: wangxuan wangxuan
 * @LastEditTime: 2024-08-19 13:08:57
 * @FilePath: /my-nest-app/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'keyboard cat',
      name: 'test.sessionId',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    }),
  );
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });
  await app.listen(3000);
}
bootstrap();
