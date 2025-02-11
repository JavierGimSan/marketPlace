import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { ThemeBaseComponent } from './theme/theme-base.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet], //ThemeBaseComponent borrado
})
export class AppComponent {
  title = 'marketplace';
}
