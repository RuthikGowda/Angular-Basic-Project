import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertzService {
  constructor() {}

  commonPopUp(  tile: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question'  ) 
  {
    Swal.fire({
      title: tile,
      text: text,
      icon: icon,
    });
  }

  showLoading(title: string = 'Loading...') {
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  closeLoading() {
    Swal.close();
  }

  ApiError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }

  SuccessTopEnd(title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: title,
    });
  }
}
