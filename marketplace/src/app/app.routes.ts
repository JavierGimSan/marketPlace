import { Routes } from '@angular/router';
import { ProductsComponent } from './routes/products/products.component';
import { ThemeBaseComponent } from './theme/theme-base.component';
import { PromotionsComponent } from './routes/promotions/promotions.component';
import { LoginComponent } from './routes/login/login.component';
import { ProductComponent } from './routes/product/product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductsComponent }],
  },
  {
    path: 'product/:id',
    component: ThemeBaseComponent,
    children:[{ path: '', component: ProductComponent}],
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

];
