import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginState } from '../../shared/services/login-state';

@Component({
  selector: 'app-profile-menu',
  imports: [RouterModule],
  template: `
    <div #dropdown class="relative ml-3">
      <div>
        <button
          (click)="dropdownEsVisible = !dropdownEsVisible"
          type="button"
          class="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">Open user menu</span>
          <img
            class="size-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" />
        </button>
      </div>

      @if (dropdownEsVisible) {
        @if (userLoggedIn()) {
          <div
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1">
            <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
            <button
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left hover:bg-gray-100"
              type="button">
              Your Profile
            </button>
            <button
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left hover:bg-gray-100"
              type="button">
              Settings
            </button>
            <button
              (click)="logout()" 
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left hover:bg-gray-100"
              type="button">
              Sign out
            </button>
          </div>
        } @else {
          <div
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1">
            <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
            <button
              routerLink="/login"
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left hover:bg-gray-100"
              type="button">
              Sign in
            </button>
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  constructor(private loginState: LoginState) {}

  dropdownEsVisible = false;
  userLoggedIn = computed(() => this.loginState.userLoggedIn()); //Servicio 
  logout() {
    //Al hacer clic en 'Sign out' Se borra el token y se actualiza la página 
    localStorage.removeItem('token');
    window.location.reload();
  }
  @ViewChild('dropdown') dropdown!: ElementRef;
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    if (this.dropdown.nativeElement.contains(event.target as Node)) {
      console.log('click hostListener inside component');
    } else {
      console.log('click hostListener outside component');
      this.dropdownEsVisible = false;
    }
  }
}
