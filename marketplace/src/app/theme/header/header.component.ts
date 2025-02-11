import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  esVisible = false;

cambiarEstadoMenu() {
  this.esVisible = !this.esVisible;
}

}
