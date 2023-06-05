import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve, join } from 'path';
import * as hbs from 'express-handlebars';
import { UnauthorizedExceptionFilter } from './helpers/unauthorized-exceptions-filter';
import { registerHandlebarsHelpers } from './helpers/hbs-helper';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  config();
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./views/pages'));
  registerHandlebarsHelpers();
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
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
