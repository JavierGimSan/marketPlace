import { Routes } from '@angular/router';
import { ProductsComponent } from './routes/products/products.component';
import { ThemeBaseComponent } from './theme/theme-base.component';
import { PromotionsComponent } from './routes/promotions/promotions.component';
import { LoginComponent } from './routes/login/login.component';
import { LandingThemeComponent } from './theme/landing-theme.component';
import { HomeComponent } from './routes/home/home.component';
import { ProductComponent } from './routes/product/product.component';
import { PromotionComponent } from './routes/promotion/promotion.component';
import { authGuard } from './authentication/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'notFound',
  // }, APLICAR EN EL FUTURO, NOT FOUND
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductsComponent }],
    canActivate: [authGuard],
  },
  {
    path: 'product/:id',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductComponent }],
    canActivate: [authGuard],
  },
  {
    path: 'promotions',
    component: ThemeBaseComponent,
    children: [{ path: '', component: PromotionsComponent }],
    canActivate: [authGuard],
  },
  {
    path: 'promotion/:id',
    component: ThemeBaseComponent,
    children: [{ path: '', component: PromotionComponent }],
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: LandingThemeComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];
