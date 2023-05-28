import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { config } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AddUserModule } from './modules/add-user/add-user.module';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './modules/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserProfileModule } from './modules/user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    AddUserModule,
    UserModule,
    UserProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
