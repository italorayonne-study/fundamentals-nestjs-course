import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
