import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  // OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginState } from '../../shared/services/login-state.service';
import { TokenService } from '../../shared/services/token.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

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
          @if (!userLoggedIn() || avatarUrl() === "") {
            <img
              class="size-8 rounded-full"
              src="https://banner2.cleanpng.com/20190617/iwq/kisspng-computer-icons-portable-network-graphics-clip-art-paula-toth-on-odyssey-1713886393505.webp"
              alt="" />
          } @else {
            <!-- Si está loggeado mostrar el icono de la API-->
          <!-- En src poner el dato dinámico que devuelve la url de la imagen-->
            <img
              class="size-8 rounded-full"
              [src]="avatarUrl()"
              alt="" />
          }
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
export class ProfileMenuComponent implements OnInit{
  constructor(
    private loginState: LoginState,
    private router: Router
  ) {}

  private tokenService = inject(TokenService);
  private userService = inject(UserService);

  dropdownEsVisible = false;
  userLoggedIn = computed(() => this.loginState.userLoggedIn()); //Servicio
  avatarUrl = signal("");

  
  
  ngOnInit(){
    this.loadAvatar();
  }

  loadAvatar(){
    const avatar = localStorage.getItem('avatarUrl');
    if(avatar){
      this.avatarUrl.set(avatar);
    } else {
      this.getUsername();
    }
  }

  getUsername(){
    this.userService.getUser().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response.username);
        const avatarApiUrl = "https://ui-avatars.com/api/?name=";
        const username = response.username;
        const avatarUrl = `${avatarApiUrl} ${username}`
        this.avatarUrl.set(avatarUrl);
        localStorage.setItem('avatarUrl', avatarUrl);   
      }
    })
  }
  
  logout() {
    // Al hacer clic en 'Sign out' se borra el token y se redirige a 'Home'
    this.tokenService.deleteToken();
    this.loginState.setLoggedInFalse();
    this.router.navigate(['']);
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
