import { Component } from '@angular/core';
import { LucideChevronRight, LucideCircle, LucideCircleX, LucideMoveRight } from '@lucide/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SignupService } from '../../service/signup/signup-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  imports: [LucideMoveRight, LucideCircleX, FormsModule, NgIf],
})
export class Signup {
  constructor(
    private router: Router,
    private readonly signupService: SignupService,
  ) {}
  email = '';
  password = '';
  name = '';
  error!: string;
  hideError = false;

  register() {
    this.signupService
      .register({ email: this.email, password: this.password, name: this.name })
      .subscribe({
        next: (res) => this.navigate('/'),
        error: (err) => {
          console.log('ERRO COMPLETO:', err);
          console.log('STATUS:', err.status);
          console.log('BODY:', err.error);
          if (Array.isArray(err.error.message)) {
            this.error = err.error.message[0];
          } else {
            this.error = err.error.message;
          }
          ((this.hideError = true),
            setTimeout(() => {
              this.hideError = false;
            }, 3000));
        },
      });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit() {}
}
