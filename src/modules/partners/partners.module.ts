import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersSchema } from 'src/entities/partners/partners.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partners', schema: PartnersSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
