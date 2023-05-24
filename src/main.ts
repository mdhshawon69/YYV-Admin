import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve, join } from 'path';
import * as hbs from 'express-handlebars';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main',
      layoutsDir: resolve(__dirname, '..', 'views/layouts'),
    }),
  );

  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
