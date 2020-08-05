import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './components/main/main.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ClientComponent } from './components/client/client.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { GuardLoginGuard } from '../login/services/guard-login.guard';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductcateListComponent } from './components/productcate-list/productcate-list.component';
import { ProductcateFormComponent } from './components/productcate-form/productcate-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [GuardLoginGuard],
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'invoice/create',
        component: InvoiceFormComponent,
      },
      {
        path: 'invoice/:id',
        component: InvoiceFormComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'product',
        component: ProductListComponent,
      },
      {
        path: 'product/create',
        component: ProductFormComponent,
      },
      {
        path: 'product/:id',
        component: ProductFormComponent
      },
      {
        path: 'product-cate',
        component: ProductcateListComponent,
      },
      {
        path: 'product-cate/:id',
        component: ProductcateFormComponent,
      },
      {
        path: 'product-cate/create',
        component: ProductcateFormComponent,
      },
      {
        path: 'post',
        loadChildren: () => import('./components/post/post.module').then(m => m.PostModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
