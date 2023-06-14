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
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TalentsModule } from './modules/talents/talents.module';
import { CultureModule } from './modules/culture/culture.module';
import { ContactModule } from './modules/contact/contact.module';
import { TeamModule } from './modules/team/team.module';
import { AboutModule } from './modules/about/about.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { MulterModule } from '@nestjs/platform-express';
import { PageModule } from './modules/page/page.module';

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
    TalentsModule,
    CultureModule,
    ContactModule,
    TeamModule,
    AboutModule,
    ProgramsModule,
    PageModule,
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
