import { Module } from '@nestjs/common';
import { CultureService } from './culture.service';
import { CultureController } from './culture.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CultureSchema } from 'src/entities/culture/culture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Culture', schema: CultureSchema }]),
  ],
  providers: [CultureService],
  controllers: [CultureController],
})
export class CultureModule {}
