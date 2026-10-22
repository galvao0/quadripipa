import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto.js';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcrypt';
import { UserStatus } from '../user/enum/user-status.js';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(dto: AuthUserDto): Promise<string> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException(`Usuario nao cadastrado.`);
    }

    const compare = await bcrypt.compare(dto.password, user.password);

    if (!compare) {
      throw new UnauthorizedException('Senha invalida.');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException('E-mail nao validado.');
    }

    if (user.status != UserStatus.APPROVED) {
      throw new UnauthorizedException('Usuario sem perimissao de acesso.');
    }

    return user.id;
  }
}
