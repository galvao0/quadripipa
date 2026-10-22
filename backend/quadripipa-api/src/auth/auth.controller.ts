import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthUserDto } from './dto/auth-user.dto.js';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth-guard.js';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post()
  async auth(
    @Body() dto: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const id = await this.authService.validateUser(dto);
    const accessToken = await this.jwtService.signAsync({
      sub: id,
    });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    return 'Login realizado com sucesso.';
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
