import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddUserController } from './add-user.controller';
import { AddUserService } from './add-user.service';
import { User } from 'src/entities/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddUserController],
  providers: [AddUserService],
})
export class AddUserModule {}
