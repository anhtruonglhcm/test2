import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductCateService } from '../../services/product-cate.service';
import { ProductCate } from '../../models/product-cate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { UploadAdapter } from '../../services/upload-adapter.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() url: string = `${environment.BASE_URL}/upload`;
  @Input() config?: Object = {};
  @ViewChild('toolbar') toolbar: ElementRef<any>;
  @ViewChild('ckeditor') ckeditor: any;
  public Editor = DecoupledEditor;
  productForm: FormGroup;
  productCate: ProductCate[];
  imgURL: string;
  ckeConfig: any;
  product: Product;
  productCateSelected: string;
  title = 'Create Product';
  titletbn = 'Create';
  isLoading = false;
  url2: string = "http://35.225.51.29:1000/lg1595304613950.png";

  constructor(
    private fb: FormBuilder,
    private productCateService: ProductCateService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      productCate: ['', Validators.required],
      file: [null],
      price: ['', Validators.required],
      status: [true],
      is_home: [false],
      position: [0],
      introduction: ['Product Introduction'],
      description: ['Product Description']

    })
  }

  ngOnInit(): void {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true
    };
    this.getProductCate();
    this.setProductToForm();
  }

  onSubmit() {
    let fd = new FormData();
    fd.append('name', this.productForm.get('name').value);
    fd.append('product_cate', this.productForm.get('productCate').value ? this.productForm.get('productCate').value : this.product.product_cate);
    fd.append('status', this.productForm.get('status').value);
    fd.append('is_home', this.productForm.get('is_home').value);
    fd.append('position', this.productForm.get('position').value);
    fd.append('intro', this.productForm.get('introduction').value);
    fd.append('description', this.productForm.get('description').value);
    fd.append('price', this.productForm.get('price').value);
    if (this.product) {
      fd.append('product', this.productForm.get('file').value ? this.productForm.get('file').value : null);
      return this.productService.updateProduct(this.product._id, fd).subscribe((data) => {
        this.router.navigate(['admin', 'product']);
        this.snackBar.open('Success', 'Update Product', { duration: 1000 })
      }, (error) => {
        this.snackBar.open('False', 'Update Product', { duration: 1000 })
      })
    } else {
      fd.append('product', this.productForm.get('file').value);
      this.productService.createProduct(fd).subscribe((data) => {
        this.router.navigate(['admin', 'product']);
        this.snackBar.open('Success', 'Create Product', { duration: 1000 })
      }, (error) => {
        console.log(error);
        this.snackBar.open('False', 'Create Product', { duration: 1000 })
      })
    }
  }

  getProductCate() {
    this.productCateService.getAllProductCate().subscribe((data) => {
      this.productCate = data;
    }, (error) => {
      this.snackBar.open('false', 'Get Product Category', { duration: 1000 })
    })
  }

  uploadFile(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.productForm.patchValue({ file: file });
    this.productForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  openImageExplorer($event) {
    try {
      let link = this.ckeditor.instance.document.createElement("img");
      link.setAttribute("alt", "image");
      link.setAttribute("src", `${this.url}`);
      this.ckeditor.instance.insertElement(link);
    } catch (error) {
      console.log(error);

    }
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this.url, this.http);
    };
  }

  setProductToForm() {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id) {
        this.isLoading = false;
        return;
      }
      this.titletbn = 'Update';
      this.productService.getOne(id).subscribe((data) => {
        this.isLoading = false;
        this.product = data;
        this.productForm.patchValue(this.product);
        this.productCateSelected = data.product_cate;
        this.imgURL = `${environment.BASE_URL}/${data.photo}`
        this.title = 'Update Product';
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open('False', 'Get Product', { duration: 1000 })
      })
    })
  }
}
