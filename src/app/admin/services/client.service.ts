import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './../models/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.API_URL}/client`);
  }
}
