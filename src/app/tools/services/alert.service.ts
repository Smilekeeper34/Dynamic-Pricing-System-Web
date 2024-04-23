import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends LoaderService{
  constructor() {
    super();
  }

  success(message: string) {
    Swal.fire({
      text: message,
      icon: 'success',
      confirmButtonColor: '#06bac7',
      confirmButtonText: 'Close',
    });
  }

  warning(message: string) {
    Swal.fire({
      text: message,
      icon: 'warning',
      confirmButtonColor: '#06bac7',
      confirmButtonText: 'Close',
    });
  }

  error(message: string) {

    Swal.fire({
      text: message,
      icon: 'error',
      confirmButtonColor: '#06bac7',
      confirmButtonText: 'Close',
    });
  }
}
