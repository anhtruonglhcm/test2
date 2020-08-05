import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductCateService } from '../../services/product-cate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCate } from '../../models/product-cate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productcate-form',
  templateUrl: './productcate-form.component.html',
  styleUrls: ['./productcate-form.component.css']
})
export class ProductcateFormComponent implements OnInit {
  productForm: FormGroup;
  imgUrl: string;
  productCate: ProductCate;
  baseUrl = environment.BASE_URL;
  title = 'Create Product Category';
  titlebtn = 'Create';
  constructor(
    private fb: FormBuilder,
    private productCateService: ProductCateService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      file: [null],
      status: [true],
      description: [''],
      position: [''],
    })
  }

  ngOnInit(): void {
    this.setValueToForm();
  }
  onSubmit() {
    let fd: any = new FormData();
    fd.append('name', this.productForm.get('name').value);
    fd.append('status', this.productForm.get('status').value);
    fd.append('description', this.productForm.get('description').value);
    fd.append('position', this.productForm.get('position').value);
    if (this.productCate) {
      fd.append('productcate', this.productForm.get('file').value ? this.productForm.get('file').value : null);
      return this.productCateService.updateProductCate(this.productCate._id, fd).subscribe((data) => {
        this.snackbar.open('Success', ' Update Product Category', { duration: 1000 })
        this.router.navigate(['admin', 'product-cate']);
      }, (error) => {
        this.snackbar.open('False', 'Update Product Category', { duration: 1000 })
      })
    } else {
      fd.append('productcate', this.productForm.get('file').value);
      return this.productCateService.createProductCate(fd).subscribe((data) => {
        this.snackbar.open('Success', 'Create Product-Cate', { duration: 1000 })
        this.router.navigate(['admin', 'product-cate']);

      }, (error) => {
        this.snackbar.open('False', 'Create Product-Cate', { duration: 1000 })

      })
    }

  }

  uploadFile(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.productForm.patchValue({ file: file })
    this.productForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  setValueToForm() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id || id === 'create') {
        return;
      }
      this.title = 'Update Product Category';
      this.titlebtn = 'Update';
      this.productCateService.getOne(id).subscribe((data) => {
        this.productCate = data;
        this.productForm.patchValue(this.productCate);
        this.imgUrl = `${this.baseUrl}/${data.photo}`
      }, (error) => {
        this.snackbar.open('False', 'Get Product Category', { duration: 1000 })
      })
    })
  }

}
