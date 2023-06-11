import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TalentsSchema } from 'src/entities/talents/talents.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Talents', schema: TalentsSchema }]),
  ],
  providers: [TalentsService],
  controllers: [TalentsController],
})
export class TalentsModule {}
