import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './modules/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { OurImpactModule } from './modules/our-impact/our-impact.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { PartnersModule } from './modules/partners/partners.module';
import { BlogModule } from './modules/blog/blog.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PortfolioController } from './modules/portfolio/portfolio.controller';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule,
    UserProfileModule,
    OurImpactModule,
    PartnersModule,
    BlogModule,
    ProjectsModule,
    PortfolioModule,
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
