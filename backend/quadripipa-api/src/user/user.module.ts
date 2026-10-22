import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { MailModule } from '../mail/mail.module.js';
import { MailService } from '../mail/mail.service.js';
import { CodeEntity } from '../code/code.entity.js';
import { CodeModule } from '../code/code.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CodeEntity]),
    MailModule,
    CodeModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
