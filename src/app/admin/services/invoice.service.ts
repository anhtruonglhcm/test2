import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice, InvoicePaginate } from '../models/invoice';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}
  getInvoice({
    page,
    perPage,
    sortField,
    sortDir,
    filter,
  }): Observable<InvoicePaginate> {
    let query = `${environment.API_URL}/invoice?page=${page}&perPage=${perPage}`;
    if (sortField && sortDir) {
      query = `${query}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      query = `${query}&filter=${filter}`;
    }
    return this.http.get<InvoicePaginate>(query);
  }
  createInvoice(data: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${environment.API_URL}/invoice`, data);
  }
  deleteInvoice(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(`${environment.API_URL}/invoice/${id}`);
  }
  getOneInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.API_URL}/invoice/${id}`);
  }
  updateInvoice(id: string, data: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${environment.API_URL}/invoice/${id}`, data);
  }
}
