import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { AsyncPipe, NgFor } from '@angular/common';
import { LucideCar, LucideChevronLeft, LucideHouse, LucideLogOut, LucideMenu, LucidePlus, LucideUser, LucideX } from '@lucide/angular';

@Component({
  templateUrl: './home.html',
  styleUrl: './home.scss',
  selector: 'app-home',
  imports: [AsyncPipe, LucideUser, LucideMenu, LucidePlus, LucideChevronLeft, LucideLogOut, LucideHouse, LucideCar, NgFor],
})
export class Home {
  private authService = inject(AuthService);
  user$ = this.authService.user$;

  menuStatus = false

  routes = [{ name: 'Home', router: '/home', icon: 'lucideHouse' }, { name: 'Cadastro de veículos', router: '/create-ve', icon: 'lucideCar' }]

  setMenu() {
    this.menuStatus = !this.menuStatus
  }

  ngOnInit() {
    console.log(this.user$);
  }
}
