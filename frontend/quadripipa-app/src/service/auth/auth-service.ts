import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthDto } from './dto/auth.dto';
import { ResponseDto } from '../response.dto';
import { ResponseUserDto } from '../signup/dto/response-user.dto';
import { Observable } from 'rxjs';

export interface Resp {
  data: ResponseUserDto;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'http://192.168.0.7:3000/auth/';

  user!: ResponseUserDto;
  l!: Error;

  auth(dto: AuthDto): Observable<Resp> {
    return this.http.post<Resp>(this.url, dto, { withCredentials: true });
  }
}
