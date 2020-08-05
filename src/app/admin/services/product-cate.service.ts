import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCate } from '../models/product-cate';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCateService {

  constructor(private http: HttpClient) { }
  getAllProductCate(): Observable<ProductCate[]> {
    return this.http.get<ProductCate[]>(`${environment.API_URL}/product-cate`)
  }

  createProductCate(data): Observable<ProductCate> {
    return this.http.post<ProductCate>(`${environment.API_URL}/product-cate`, data);
  }

  deleteProductCate(id: string): Observable<ProductCate> {
    return this.http.delete<ProductCate>(`${environment.API_URL}/product-cate/${id}`)
  }

  updateStatus(id: string): Observable<ProductCate> {
    return this.http.get<ProductCate>(`${environment.API_URL}/product-cate/updatestatus/${id}`)
  }

  getOne(id: string): Observable<ProductCate> {
    return this.http.get<ProductCate>(`${environment.API_URL}/product-cate/${id}`)
  }

  updateProductCate(id: string, body): Observable<ProductCate> {
    return this.http.put<ProductCate>(`${environment.API_URL}/product-cate/${id}`, body)
  }
}
