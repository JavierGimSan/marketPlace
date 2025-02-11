import { Routes } from '@angular/router';
import { ProductsComponent } from './routes/products/products.component';
import { ThemeBaseComponent } from './theme/theme-base.component';

export const routes: Routes = [
  {
    path: '',
    component: ThemeBaseComponent,
  },
  {
    path: 'products',
    component: ThemeBaseComponent,
    children: [{ path: '', component: ProductsComponent }],
  },
];
