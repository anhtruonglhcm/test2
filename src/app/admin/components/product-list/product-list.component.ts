import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'photo', 'name', 'price', 'position', 'status', 'home', 'action'];
  dataProduct: Product[];
  baseURL = environment.BASE_URL;
  isLoading = false;
  page = sessionStorage.getItem('page') ? parseInt(sessionStorage.getItem('page'), 10) : 1;
  perPage = sessionStorage.getItem('perPage') ? parseInt(sessionStorage.getItem('perPage'), 10) : 10;
  filter = sessionStorage.getItem('filter') ? sessionStorage.getItem('filter') : '';
  sortField = sessionStorage.getItem('sortField') ? sessionStorage.getItem('sortField') : '';
  sortDir = sessionStorage.getItem('sortDir') ? sessionStorage.getItem('sortDir') : '';
  productCount: number;
  constructor(private productService: ProductService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.isLoading = true;
    return this.productService.getAllProduct({ page: this.page, perPage: this.perPage, filter: this.filter, sortField: this.sortField, sortDir: this.sortDir })
      .subscribe((data) => {
        this.isLoading = false;
        this.productCount = data.totalDocs;
        this.dataProduct = data.docs;
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open('False', 'Get Product', { duration: 1000 })
      })
  }

  pageEvent(e) {
    this.isLoading = true;
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;
    sessionStorage.setItem('page', this.page.toString());
    sessionStorage.setItem('perPage', this.perPage.toString());
    return this.productService.getAllProduct({ page: this.page, perPage: this.perPage, filter: this.filter, sortField: this.sortField, sortDir: this.sortDir })
      .subscribe((data) => {
        this.isLoading = false;
        this.dataProduct = data.docs;
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open('False', 'Get Product', { duration: 1000 })
      })
  }

  changeStatus(id) {
    const index = this.dataProduct.findIndex(element => element._id === id);
    this.dataProduct[index].status = !this.dataProduct[index].status;
    return this.productService.updateStatus(id).subscribe((data) => { }, (error) => {
      this.snackBar.open('False', 'Update Status', { duration: 1000 })
    })
  }

  changeHome(id) {
    const index = this.dataProduct.findIndex(element => element._id === id);
    this.dataProduct[index].is_home = !this.dataProduct[index].is_home;
    return this.productService.updateHome(id).subscribe((data) => { }, (error) => {
      this.snackBar.open('False', 'Update Home', { duration: 1000 })
    })
  }

  onChange(e) {
    this.sortField = e.active;
    this.sortDir = e.direction;
    sessionStorage.setItem('sortField', this.sortField);
    sessionStorage.setItem('sortDir', this.sortDir);
    return this.productService.getAllProduct({ page: this.page, perPage: this.perPage, filter: this.filter, sortField: this.sortField, sortDir: this.sortDir })
      .subscribe((data) => {
        this.dataProduct = data.docs;
      }, (error) => {
        this.snackBar.open('False', 'Get Product', { duration: 1000 })
      })
  }

  filterChange(filter) {
    this.filter = filter;
    sessionStorage.setItem('filter', this.filter);
    return this.productService.getAllProduct({ page: this.page, perPage: this.perPage, filter: this.filter, sortField: this.sortField, sortDir: this.sortDir })
      .subscribe((data) => {
        this.dataProduct = data.docs;
      }, (error) => {
        this.snackBar.open('False', 'Get Product', { duration: 1000 })
      })
  }

  deleteProduct(id) {
    const data = this.dataProduct.filter(element => element._id != id);
    this.dataProduct = [...data];
    this.productService.deleteProduct(id).subscribe((data) => {
      this.snackBar.open('Success', 'Delete Product', { duration: 1000 })
    }, (error) => {
      this.snackBar.open('False', 'Delete Product', { duration: 1000 })
    })
  }

  updateProduct(id) {
    this.router.navigate(['admin', 'product', id]);
  }
}
