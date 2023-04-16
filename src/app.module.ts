import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { UserService } from './user/user.service';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    FileModule,
    PrismaModule,
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: 'rayoneitalo@gmail.com',
          pass: 'rwvqzzccgkgjbkzj',
        },
      },
      defaults: {
        from: `"nest-modules" <rayoneitalo@gmail.com>'`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, PrismaService, AuthService, JwtService],
})
export class AppModule {}
