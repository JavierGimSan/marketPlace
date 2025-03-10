import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownEsVisible = false;

  cambiarEstadoMenu() {
    this.dropdownEsVisible = !this.dropdownEsVisible;
    console.log(this.dropdownEsVisible);
  }


}