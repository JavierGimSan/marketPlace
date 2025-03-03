import { Routes } from '@angular/router';
import { ProductsComponent } from './routes/products/products.component';
import { ThemeBaseComponent } from './theme/theme-base.component';
import { PromotionsComponent } from './routes/promotions/promotions.component';
import { LoginComponent } from './routes/login/login.component';
import { LandingThemeComponent } from './theme/landing-theme.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'notFound',
  // }, APLICAR EN EL FUTURO, NOT FOUND
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path:'test',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'products',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductsComponent }],
  },
  {
    path: 'promotions',
    component: ThemeBaseComponent,
    children: [{ path: '', component: PromotionsComponent }],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: LandingThemeComponent,
    children: [{path: '', component: HomeComponent}],
  }
];
   