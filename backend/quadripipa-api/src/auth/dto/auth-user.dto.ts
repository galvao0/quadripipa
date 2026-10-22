import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @IsString({ message: 'Campo e-mail deve ser texto.' })
  @IsNotEmpty({ message: 'Preencho campo e-mail.' })
  email: string;

  @IsString({ message: 'Campo senha deve ser texto.' })
  @IsNotEmpty({ message: 'Preencha o campo senha.' })
  password: string;
}
