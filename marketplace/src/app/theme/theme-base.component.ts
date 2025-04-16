import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-theme-base',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <app-sidebar class="hidden sm:block"></app-sidebar>
    <div class="sm:mt-[180px] sm:ml-[250px]">
      <router-outlet ></router-outlet>
    </div>
    `,
  styleUrl: './theme-base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBaseComponent {
 }
