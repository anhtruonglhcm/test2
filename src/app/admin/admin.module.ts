import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostModule } from './components/post/post.module';

import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { MainComponent } from './components/main/main.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ClientComponent } from './components/client/client.component';
import { AdminComponent } from './admin.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductcateListComponent } from './components/productcate-list/productcate-list.component';
import { ProductcateFormComponent } from './components/productcate-form/productcate-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component'

import { InvoiceService } from './services/invoice.service';
import { ClientService } from './services/client.service';
import { ProductCateService } from './services/product-cate.service';
import { ProductService } from './services/product.service';
import { TokenInterceptorService } from './services/core/token-interceptor.service';
import { GlobalErrorHandlerService } from './services/core/error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    InvoiceComponent,
    ClientComponent,
    AdminComponent,
    ToolbarComponent,
    InvoiceFormComponent,
    ProductListComponent,
    ProductcateListComponent,
    ProductcateFormComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
    PostModule
  ],
  providers: [
    InvoiceService,
    ClientService,
    ProductCateService,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true, },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
})
export class AdminModule { }
