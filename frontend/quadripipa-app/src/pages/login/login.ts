import { Component } from '@angular/core';
import { LucideChevronRight, LucideCircle, LucideCircleX, LucideMoveRight } from '@lucide/angular';
import { AuthService } from '../../service/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [LucideMoveRight, LucideCircleX, FormsModule, NgIf],
})
export class Login {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}
  email = '';
  password = '';
  error!: string;
  hideError = false;

  auth() {
    this.authService.auth({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        ((this.authService.user = res.data), this.router.navigate(['/home']), console.log(res));
      },
      error: (err) => {
        if (Array.isArray(err.error.message)) {
          this.error = err.error.message[0];
        } else {
          this.error = err.error.message;
        }
        this.hideError = true;
        setTimeout(() => {
          this.hideError = false;
        }, 3000);
        if (err.error.message === 'E-mail nao validado.') {
          this.router.navigate(['/verify-email'], {
            state: {
              email: this.email,
            },
          });
        }
      },
    });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit() {}
}
