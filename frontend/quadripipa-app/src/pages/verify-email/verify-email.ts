import { Component } from '@angular/core';
import { LucideInfo } from '@lucide/angular';
import { VerifyEmailService } from '../../service/verify-email/verify-email-service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  styleUrl: './verify-email.scss',
  templateUrl: './verify-email.html',
  imports: [LucideInfo, NgFor, NgIf],
})
export class VerifyEmail {
  email!: string;
  constructor(private readonly verifyEmailService: VerifyEmailService) {
    this.email = history.state.email;
  }

  numCode: string[] = ['', '', '', '', '', ''];
  code = '';

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.replace(/\D/g, '').slice(-1);

    this.numCode[index] = valor;
    input.value = valor;

    this.code = this.numCode.join('');
  }
  hideError = false;
  error!: string;

  verifyEmail() {
    this.verifyEmailService.verifyEmail({ email: this.email, code: this.code }).subscribe({
      next: (res) => console.log('f'),
      error: (err) => {
        this.error = err.error.message;
        this.hideError = true;
        setTimeout(() => {
          this.hideError = false;
        }, 3000);
      },
    });
  }
}
