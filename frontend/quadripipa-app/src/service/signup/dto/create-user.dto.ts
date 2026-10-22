import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Campo [nome] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [nome] nao pode ser vazio.' })
  name!: string;

  @IsString({ message: 'Campo [e-mail] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [e-mail] nao pode ser vazio.' })
  email!: string;

  @IsString({ message: 'Campo [senha] deve ser texto.' })
  @IsNotEmpty({ message: 'Campo [senha] nao pode ser vazio.' })
  @Length(6, 21, { message: 'Campo [senha] deve conter de 6-21 caracteres.' })
  password!: string;
}
