import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { of, Subscription, interval, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data$ = of('John Doe', 30, 'Software Engineer');
  private networkAlertShown = false;

  nameArray$ = from(['John', 'Jane', 'Doe']);

  //data : string[] = this.nameArray.map(name=>name.toUpperCase());

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      console.log('Data received:', data);
    });

    this.nameArray$
      .pipe(
        tap(a => console.log('Before Map ', a)),
        map((name: string) => {
          console.log('Each Map Data:', name);
          return name;
        })
      )
      .subscribe((data) => {
        console.log('Transformed Data:', data);
      });
  }

  showNetworkDownAlert = () => {
    if (!this.networkAlertShown) {
      Swal.fire({
        icon: 'error',
        title: 'Network Down',
        text: 'You are offline. Please check your internet connection.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      }).then((result) => {
        this.closeNetworkDownAlert();
      });
      this.networkAlertShown = true;
    }
  };

  closeNetworkDownAlert = () => {
    if (this.networkAlertShown) {
      Swal.close();
      this.networkAlertShown = false;
    }
  };

  testSwal() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  showAvatar() {
    Swal.fire({
      title: 's avatar',
      imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
    });
  }
}
