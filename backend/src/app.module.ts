import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ProfileModule } from './profile/profile.module';
import { ApplicationModule } from './application/application.module';
import { EmployeeModule } from './employee/employee.module';
import { NotificationModule } from './notification/notification.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    JobsModule,
    PrismaModule,
    BookmarksModule,
    ProfileModule,
    ApplicationModule,
    EmployeeModule,
    NotificationModule,
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
