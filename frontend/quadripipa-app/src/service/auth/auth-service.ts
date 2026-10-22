import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthDto } from './dto/auth.dto';
import { ResponseUserDto } from '../signup/dto/response-user.dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'http://192.168.0.7:3000/auth/';

  private userSubject = new BehaviorSubject<ResponseUserDto | null>(null);
  user$ = this.userSubject.asObservable();

  auth(dto: AuthDto): Observable<string> {
    return this.http.post(this.url, dto, { withCredentials: true, responseType: 'text' });
  }

  me(): Observable<ResponseUserDto> {
    return this.http.get<ResponseUserDto>(`${this.url}me`, { withCredentials: true }).pipe(
      tap((user) => {
        this.userSubject.next(user);
      }),
    );
  }
}
