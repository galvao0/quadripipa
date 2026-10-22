import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseUserDto } from './dto/response-user.dto.js';
import { ResponseDto } from '../dto/response.dto.js';
import { VerifyUserDto } from './dto/verify-user.dto.js';
import { MailService } from '../mail/mail.service.js';
import bcrypt from 'bcrypt';
import { CodeService } from '../code/code.service.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly codeService: CodeService,
  ) {}

  async create(dto: CreateUserDto): Promise<ResponseDto<ResponseUserDto>> {
    const exists = await this.userRepository.findOneBy({ email: dto.email });

    if (exists) {
      throw new ConflictException(
        `Usuario ja cadastro com e-mail: ${dto.email}.`,
      );
    }

    const hash = await bcrypt.hash(dto.password, 10);

    dto.password = hash;

    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);

    const code = await this.codeService.create(user);

    await this.mailService.sendMail(
      user.email,
      'Código de Verifição',
      `
        <h1>Confirme seu e-mail para acessar sua conta</h1>
        <p>Seu código é:</p>
        <b>${code}</b>
        <p>Ele expirara em 45 minutos.</p>
      `,
    );

    return {
      data: user,
      message:
        'Usuário cadastrado com sucesso.\nVerifique seu e-mail para acessar sua conta.',
    };
  }

  async verifyEmail(dto: VerifyUserDto): Promise<string> {
    const exists = await this.userRepository.findOneBy({ email: dto.email });

    if (!exists) {
      throw new NotFoundException(
        `Nenhum usuario cadastrado com e-mail: ${dto.email}.`,
      );
    }

    await this.codeService.verifyCode({
      email: dto.email,
      code: dto.code,
    });

    return 'E-mail verificado com sucesso.';
  }

  async findAll(): Promise<ResponseUserDto[] | unknown> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
