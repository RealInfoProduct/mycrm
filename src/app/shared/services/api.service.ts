import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL: string = environment.BASE_URL;


  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error);
}


  /*  GET METHOD */

  
  get(path?: string, params: HttpParams = new HttpParams()): Observable<any> {
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json'    });
    return this.http.get(this.BASE_URL + path,
      { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  /*  POST METHOD */

  
  post(path?: string, body: Object = {}): Observable<any> {
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json'    });
    return this.http.post(this.BASE_URL + path,
      body, {headers})
      .pipe(catchError(this.formatErrors));
  }

  /*  PUT METHOD */

  put(path?: string, body: Object = {}): Observable<any> {
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json'    });
    return this.http.put(this.BASE_URL + path!,
      body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  /*  DELTE METHOD */

  delete(path?: string, body: Object = {}): Observable<any> {
    return this.http.delete(this.BASE_URL + path, body)
      .pipe(catchError(this.formatErrors));
  }

   /*  POSTBLOB METHOD */

   postBlob(path?: string, body: Object = {}): Observable<any> {
    return this.http.post(this.BASE_URL + path,
      body, { responseType : 'blob' })
      .pipe(catchError(this.formatErrors));
  }


  getJsonData(path?: any, params: HttpParams = new HttpParams()): Observable<any> {
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json'    });
    return this.http.get( path,
      { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  axiosPut(resource: string, data: any) {
    const url = `${resource}`;
    return axios.put(url, data);
  }
}
