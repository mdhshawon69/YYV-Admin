import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from 'src/entities/portfolio/portfolio.schema';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
