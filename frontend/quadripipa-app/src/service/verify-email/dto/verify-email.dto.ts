import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ResponseUserDto } from '../../signup/dto/response-user.dto.js';

export class VerifyEmailDto {
  @IsNotEmpty({ message: 'Campo [e-mail] nao pode ser vazio.' })
  email!: string;

  @IsString({ message: 'Campo [code] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [code] nao pode ser vazio.' })
  @MaxLength(6, { message: 'Campo [code] deve conter exatamente 6 números.' })
  code!: string;
}
