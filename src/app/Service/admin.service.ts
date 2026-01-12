import { inject, Injectable } from '@angular/core'; 
import { BehaviorSubject, switchMap } from 'rxjs';
import { CarouselItem } from '../Model/admin';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.production';
import { ApiResponse } from '../Model/ApiRes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


  http = inject(HttpClient);

  CarouselSub$ = new BehaviorSubject<string>('');

  getCarouseldata$ = this.CarouselSub$.pipe(
    switchMap(s => this.http.get<ApiResponse<CarouselItem[]>>(`${environment.ASPNET_API_URL + environment.getcarousel}`)
    ))

  getCarouseldata2$ = this.http.get<ApiResponse<CarouselItem[]>>(`${environment.ASPNET_API_URL + environment.getcarousel}`);

  getCarouseldat() {
    this.CarouselSub$.next('Admin');
  }
}
