import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt, Verify } from 'crypto';
import { CreateCodeDto } from './dto/create-code.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity } from './code.entity.js';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity.js';
import { VerifyCodeDto } from './dto/verify-code.dto.js';
import { ResponseDto } from '../dto/response.dto.js';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity)
    private readonly codeRepository: Repository<CodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<string> {
    const code = randomInt(100000, 1000000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 45);
    this.save({ code, expiresAt, user });
    return code;
  }

  async verifyCode(dto: VerifyCodeDto): Promise<ResponseDto<Boolean>> {
    const code = await this.codeRepository.findOne({
      where: {
        user: {
          email: dto.email,
        },
      },
      order: {
        expiresAt: 'DESC',
      },
    });
    if (!code || dto.code !== code.code) {
      throw new BadRequestException('Código invalido.');
    } else if (code.expiresAt > new Date()) {
      code.expired = true;
      await this.codeRepository.save(code);
      throw new BadRequestException('Código expirado.');
    } else if (code.used) {
      throw new BadRequestException('Código ja utilizado.');
    }

    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) return { data: false, message: '' };

    user.emailVerified = true;
    await this.userRepository.save(user);

    code.used = true;
    await this.codeRepository.save(code);

    return { data: true, message: 'Código valido.' };
  }

  private async save(dto: CreateCodeDto): Promise<void> {
    const code = this.codeRepository.create(dto);
    await this.codeRepository.save(code);
  }
}
