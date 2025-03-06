import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-theme',
  imports: [HeaderComponent, RouterOutlet],
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `,
  styleUrl: './landing-theme.component.scss'
})
export class LandingThemeComponent {

}
