import { Module } from '@nestjs/common';
import { OurImpactService } from './our-impact.service';
import { OurImpactController } from './our-impact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImpactNumberSchema } from 'src/entities/our_impact/our_impact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ImpactNumber', schema: ImpactNumberSchema },
    ]),
  ],
  providers: [OurImpactService],
  controllers: [OurImpactController],
})
export class OurImpactModule {}
