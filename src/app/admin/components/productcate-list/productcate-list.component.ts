import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCateService } from '../../services/product-cate.service';
import { ProductCate } from '../../models/product-cate';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productcate-list',
  templateUrl: './productcate-list.component.html',
  styleUrls: ['./productcate-list.component.css']
})
export class ProductcateListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'photo', 'position', 'status', 'action'];
  dataProductCate: ProductCate[];
  base_url = environment.BASE_URL;
  isLoading = false;
  constructor(private router: Router, private productCateService: ProductCateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProductCate();
  }
  createProductCate() {
    this.router.navigate(['admin', 'product-cate', 'create'])
  }

  getAllProductCate() {
    this.isLoading = true;
    return this.productCateService.getAllProductCate().subscribe((data) => {
      this.dataProductCate = data;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      console.log(error.status);


    })
  }

  deleteProductCate(id) {
    const dataProductCate = this.dataProductCate.filter(e => e._id != id);
    this.dataProductCate = dataProductCate;
    return this.productCateService.deleteProductCate(id).subscribe((data) => {
      console.log(data);
      this.snackBar.open('Success', 'Delete Product Category', { duration: 1000 })
    }, (error) => {
      this.snackBar.open('False', 'Delete Product Cate', { duration: 1000 })
    })
  }

  update(id) {
    const index = this.dataProductCate.findIndex(e => e._id === id);
    this.dataProductCate[index].status = !this.dataProductCate[index].status;
    return this.productCateService.updateStatus(id).subscribe((data) => {
      this.snackBar.open('Success', 'Update Status', { duration: 1000 })
    }, (error) => {
      this.snackBar.open('False', 'Update Status', { duration: 1000 })
    })
  }

  edit(id) {
    this.router.navigate(['admin', 'product-cate', id]);
  }
}
