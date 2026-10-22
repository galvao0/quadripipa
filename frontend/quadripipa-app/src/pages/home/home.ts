import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';

@Component({
  templateUrl: './home.html',
  styleUrl: './home.scss',
  selector: 'app-home',
  imports: [],
})
export class Home {
  constructor(private readonly authService: AuthService) {}
  l!: string | undefined;
  ngOnInit() {
    this.l = this.authService.user?.email;
  }
}
