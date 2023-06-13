import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramsSchema } from 'src/entities/programs/programs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Programs', schema: ProgramsSchema }]),
  ],
  providers: [ProgramsService],
  controllers: [ProgramsController],
})
export class ProgramsModule {}
