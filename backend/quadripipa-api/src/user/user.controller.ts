import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseUserDto } from './dto/response-user.dto.js';
import { UserService } from './user.service.js';
import { ResponseDto } from '../dto/response.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { VerifyUserDto } from './dto/verify-user.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() dto: CreateUserDto,
  ): Promise<ResponseDto<ResponseUserDto>> {
    return await this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ResponseDto<ResponseUserDto> | unknown> {
    return await this.userService.findAll();
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyUserDto): Promise<string> {
    return await this.userService.verifyEmail(dto);
  }
}
