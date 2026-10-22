import { UserStatus } from '../enum/user-status.js';
import { UserType } from '../../dto/user-type.js';

export class ResponseUserDto {
  id!: string;
  name!: string;
  email!: string;
  status!: UserStatus;
  type!: UserType;
  emailVerified!: boolean;
}
