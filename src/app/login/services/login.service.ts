import { Injectable } from '@angular/core';
import { DataLogin } from '../models/data-login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(data): Observable<DataLogin> {
    return this.http.post<DataLogin>(`${environment.API_URL}/user/login`, data);
  }
}
