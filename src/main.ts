import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve, join } from 'path';
import * as hbs from 'express-handlebars';
import { UnauthorizedExceptionFilter } from './helpers/unauthorized-exceptions-filter';
import { config } from 'dotenv';
import { current, eq, incIndex, queryVar, trim } from './helpers/hbs-helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  config();
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./views/pages'));

  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main',
      layoutsDir: resolve(__dirname, '..', 'views/layouts'),
      helpers: {
        eq: eq,
        trim: trim,
        incIndex: incIndex,
        current: current,
        queryVar: queryVar,
      },
    }),
  );

  app.setViewEngine('hbs');
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
