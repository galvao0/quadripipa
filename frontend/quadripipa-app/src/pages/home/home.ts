import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  templateUrl: './home.html',
  styleUrl: './home.scss',
  selector: 'app-home',
  imports: [AsyncPipe],
})
export class Home {
  private authService = inject(AuthService);
  user$ = this.authService.user$;
  ngOnInit() {
    console.log(this.user$);
  }
}
