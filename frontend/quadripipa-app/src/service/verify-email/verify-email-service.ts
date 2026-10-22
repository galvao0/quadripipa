import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Observable } from 'rxjs';
import { env } from '../../env';
import { ResponseDto } from '../response.dto';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  private http = inject(HttpClient);

  verifyEmail(dto: VerifyEmailDto): Observable<ResponseDto<Boolean>> {
    return this.http.post<ResponseDto<Boolean>>(`${env.apiUrl}/user/verify-email`, dto);
  }
}
