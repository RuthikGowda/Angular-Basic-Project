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
  

  httpPost<Tres>(url: string, data: any): Observable<ApiResponse<Tres>> {
    debugger;
    console.log('HTTP POST Request:', url, data);
    return this.http.post<ApiResponse<Tres>>(url, data, {
      headers: myConstants.headers
    });
  }
}
