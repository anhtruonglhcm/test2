import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductPaginate } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAllProduct({ page, perPage, filter, sortField, sortDir }): Observable<ProductPaginate> {
    let query = `${environment.API_URL}/product?page=${page}&perPage=${perPage}`
    if (filter) {
      query = `${query}&filter=${filter}`
    }
    if (sortField && sortField) {
      query = `${query}&sortField=${sortField}&sortDir=${sortDir}`
    }
    return this.http.get<ProductPaginate>(query)
  }

  createProduct(body): Observable<Product> {
    return this.http.post<Product>(`${environment.API_URL}/product`, body)
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.API_URL}/product/${id}`)
  }

  updateStatus(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/product/updatestatus/${id}`)
  }

  updateHome(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/product/updatehome/${id}`)
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/product/${id}`)
  }

  updateProduct(id: string, body): Observable<Product> {
    return this.http.put<Product>(`${environment.API_URL}/product/${id}`, body)
  }
}
