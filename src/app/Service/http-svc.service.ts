import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { myConstants } from '../staticData/myConstants';
import { ApiResponse } from '../Model/ApiRes';

@Injectable({
  providedIn: 'root'
})
export class HttpSvcService {

  http = inject(HttpClient)
  
httpGetWithNoData<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(url);
  }

  httpPost<Tres, Tdata>(url: string, data: Tdata): Observable<ApiResponse<Tres>> {
    debugger;
    console.log('HTTP POST Request:', url, data);
    return this.http.post<ApiResponse<Tres>>(url, data );
  }

  httpGet<T>(url: string, id?: string | number): Observable<ApiResponse<T>> {
    const finalUrl = id !== undefined && id !== null ? `${url}/${id}` : url;
    return this.http.get<ApiResponse<T>>(finalUrl);
  }
}
