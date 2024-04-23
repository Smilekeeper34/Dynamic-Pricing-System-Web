import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApisService } from './apis.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();
  constructor(private apis: ApisService, private router: Router) {
    // super();
  }

  generateToken(data: any) {
    return this.apis.post(`/api/auth/generateToken`, data);
  }

  updatePassword(data: any) {
    return this.apis.put(
      `/api/v1/user/update-password/${data.email}/${data.oldPassword}/${data.newPassword}`
    );
  }

  resetPassword(email: string) {
    return this.apis.get(`/api/v1/user/resetPassword/${email}`);
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
    this.setUserDetails();
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setUserDetails() {
    const token = this.getToken();
    if (token != null) {
      sessionStorage.setItem(
        'user',
        JSON.stringify(this.getDecodedAccessToken(token))
      );

      if (this.getUser().status=='ACTIVE') {
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.logout();
        // this.warning(
        //   'Your account is not active, kindly check with the administrator!'
        // );
      }
    }
  }

  getUser() {
    const user = sessionStorage.getItem('user')!;
    return JSON.parse(user);
  }

  getDecodedAccessToken(token: string): any {
    return this.helper.decodeToken(token);
  }

  isLoggedIn() {
    if (!this.isTokenExpired()) this.router.navigateByUrl('/admin/dashboard');
  }

  isTokenExpired() {
    return this.helper.isTokenExpired(this.getToken());
  }

  logout() {
    sessionStorage.clear();
    return this.router.navigateByUrl('/login');
  }
}
