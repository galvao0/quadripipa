import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'Campo [e-mail] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [e-mail] nao pode ser vazio.' })
  email!: string;

  @IsString({ message: 'Campo [senha] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [senha] nao pode ser vazio.' })
  password!: string;
}
