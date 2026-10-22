import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('quadripipa-app');

  constructor() {
    StatusBar.setStyle({ style: Style.Light });
  }
}
