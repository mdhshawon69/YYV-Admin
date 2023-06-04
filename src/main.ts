import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve, join } from 'path';
import * as hbs from 'express-handlebars';
import * as cookieParser from 'cookie-parser';
import { UnauthorizedExceptionFilter } from './helpers/unauthorized-exceptions-filter';
import { registerHandlebarsHelpers } from './helpers/hbs-helper';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.use(cookieParser());
  app.useStaticAssets(resolve('./src/public'));

  //Multer middleweare
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });
  app.use(upload.single('file'));
  //

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
