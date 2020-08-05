import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
export class UploadAdapter {
  constructor(
    private loader,
    public url: string,
    private http: HttpClient
  ) { }
  uploadFile(file, url?: string, user?: string) {
    let name = '';
    let formData: FormData = new FormData();
    let headers = new Headers();
    name = file.name;
    formData.append('file', file, name);
    const dotIndex = name.lastIndexOf('.');
    const fileName = dotIndex > 0 ? name.substring(0, dotIndex) : name;
    formData.append('name', fileName);
    formData.append('source', user);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.post(url, formData, options);
  }
  upload() {
    let upload = new Promise((resolve, reject) => {
      this.loader['file'].then(
        (data) => {
          this.uploadFile(data, this.url, '')
            .subscribe(
              (result) => {
                resolve({ default: result['urls'] })
              },
              (error) => {
                reject(data.msg);
              }
            );
        }
      );
    });
    return upload;
  }
  abort() {
    console.log("abort")
  }
}