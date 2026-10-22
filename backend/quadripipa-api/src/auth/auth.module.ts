import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { UserService } from '../user/user.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity.js';
import { MailService } from '../mail/mail.service.js';
import { JwtModule } from '@nestjs/jwt';
import { CodeService } from '../code/code.service.js';
import { CodeEntity } from '../code/code.entity.js';
import { JwtStrategy } from './jwt-strategy.js';
import { PassportModule } from '@nestjs/passport' 

@Module({
  providers: [AuthService, UserService, MailService, CodeService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule.register({
      session: false,
    }),
    TypeOrmModule.forFeature([UserEntity, CodeEntity]),
    JwtModule.register({
      secret: 'flamengo',
      signOptions: { expiresIn: '15min' },
    }),
  ],
})
export class AuthModule {}
