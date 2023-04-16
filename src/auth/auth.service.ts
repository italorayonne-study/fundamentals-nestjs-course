import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async createToken() {
    return;
  }

  async checkToken(token: string) {
    return this.jwtService.verify(token);
  }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new HttpException(
        'Verify your login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      success: true,
      status: 200,
      data: user,
    };
  }
  async forget({ email }: AuthForgetDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Check if your email is valid');
    }

    return this.mailerService.sendMail({
      subject: 'Notificação',
      to: user.email,
      template: './welcome',
      context: {
        user: user.name,
        content:
          'Bem vindo ao seu sistema de eventos! Por favor, confirme o seu email',
      },
    });
  }
}
