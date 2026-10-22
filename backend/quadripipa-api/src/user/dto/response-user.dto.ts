import { UserStatus } from '../enum/user-status.js';
import { UserType } from '../enum/user-type.js';

export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  type: UserType;
  emailVerified: boolean;
}
