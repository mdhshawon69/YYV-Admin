/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://nestCmsDbAdmin:dxZtvLO6O70UNd7c@cluster0.lyljemi.mongodb.net/yyv_nest_cms_db?retryWrites=true&w=majority',
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
