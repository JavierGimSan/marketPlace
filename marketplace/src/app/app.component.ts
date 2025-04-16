import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './shared/services/login.service';
import { Store } from '@ngrx/store';
import { loadOrderRequest } from './state/actions/cart.actions';

// import { ThemeBaseComponent } from './theme/theme-base.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet], //ThemeBaseComponent borrado
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService, private store: Store){}
  title = 'marketplace';

  ngOnInit() {
    this.store.dispatch(loadOrderRequest());
  }
}
