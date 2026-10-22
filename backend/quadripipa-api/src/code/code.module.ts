import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity } from './code.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { CodeService } from './code.service.js';
import { CodeController } from './code.controller.js';
@Module({
  imports: [TypeOrmModule.forFeature([CodeEntity, UserEntity])],
  providers: [CodeService],
  exports: [CodeService],
  controllers: [CodeController],
})
export class CodeModule {}
