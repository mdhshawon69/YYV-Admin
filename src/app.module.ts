import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { config } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(config), JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
