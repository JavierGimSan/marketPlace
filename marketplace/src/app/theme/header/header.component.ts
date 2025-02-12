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

  dropdownEsVisible = false;

cambiarEstadoMenu() {
  this.dropdownEsVisible = !this.dropdownEsVisible;
  console.log(this.dropdownEsVisible);
}

}
