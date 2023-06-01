/* eslint-disable prettier/prettier */
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  uri: 'mongodb+srv://nestCmsDbAdmin:dxZtvLO6O70UNd7c@cluster0.lyljemi.mongodb.net/yyv_nest_cms_db?retryWrites=true&w=majority', // Replace with your MongoDB connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
