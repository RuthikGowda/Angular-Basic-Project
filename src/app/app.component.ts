import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
import { LoadingBarComponent, LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PrimeNG } from 'primeng/config';
 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , LoadingBarModule,LoadingBarRouterModule, 
    LoadingBarHttpClientModule
      
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'CRUDBasicProj';
  ngPrime = inject(PrimeNG)
   ngOnInit(): void {
    this.ngPrime.ripple.set(true);
  }

}
