import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostCate } from '../models/postcate';

@Injectable({
  providedIn: 'root'
})
export class PostCateService {

  constructor(private http: HttpClient) { }
  createPostCate(body): Observable<PostCate> {
    return this.http.post<PostCate>(`${environment.API_URL}/post-cate`, body)
  }
}
