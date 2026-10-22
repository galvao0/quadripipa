import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../env';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../response.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private http = inject(HttpClient);

  register(dto: CreateUserDto): Observable<ResponseDto<ResponseUserDto>> {
    return this.http.post<ResponseDto<ResponseUserDto>>(`${env.apiUrl}/user/`, dto);
  }
}
