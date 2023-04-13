import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.userService.create(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDto) {
    throw new NotImplementedException();
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDto) {
    throw new NotImplementedException();
  }
}
