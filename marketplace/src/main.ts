import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from './app/state/reducers/cart.reducer';
import { environment } from './environments/environment';
import {provideEffects} from '@ngrx/effects';
import { CartEffects } from './app/state/effects/cart.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ cart: cartReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideEffects(CartEffects),
  ],
});
