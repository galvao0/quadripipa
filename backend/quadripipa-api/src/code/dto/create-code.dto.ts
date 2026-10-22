import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../user/user.entity.js';

export class CreateCodeDto {
  @IsString({ message: 'Campo [código] deve ser do tipo texto.' })
  @IsNotEmpty({ message: 'Campo [código] nao pode ser vazio' })
  code: string;

  @IsDate({ message: 'Campo [expira em] deve ser do tipo data.' })
  @IsNotEmpty({ message: 'Campo [expira em] nao pode ser vazio.' })
  expiresAt: Date;

  @IsNotEmpty({ message: 'Relacao [usuario] nao pode ser vazio.' })
  user: UserEntity;
}
