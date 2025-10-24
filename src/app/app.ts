import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header as HeaderComponent } from './components/header/header';
import { Home } from "./home/home";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})

export class App {
  protected readonly title = signal('e-commerce-grocery-store');
}
