import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
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
  // async forget({ email }: AuthForgetDto) {}
  // async reset() {}
}
