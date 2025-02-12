import { Routes } from '@angular/router';
import { ProductsComponent } from './routes/products/products.component';
import { ThemeBaseComponent } from './theme/theme-base.component';
import { PromotionsComponent } from './routes/promotions/promotions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    component: ThemeBaseComponent,
  },
  {
    path: 'products',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductsComponent }],
  },
  {
    path: 'promotions',
    component: ThemeBaseComponent,
    children: [{ path: '', component: PromotionsComponent }],
  }
];
