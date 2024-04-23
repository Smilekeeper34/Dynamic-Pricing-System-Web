import { Injectable } from '@angular/core';
import { ApisService } from './apis.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AlertService {
  constructor(private apis: ApisService) {
    super();
  }

  addUser(data: any) {
    return this.apis.post(`/api/v1/user`, data);
  }

  updateUser(data: any) {
    return this.apis.put(`/api/v1/user/update`, data);
  }

  getUsers() {
    return this.apis.get(`/api/v1/user/list`);
  }

  getUserByUsername(username: string) {
    return this.apis.get(`/api/v1/user/find-by-username/${username}`);
  }

  activateUser(email: string, activate: boolean) {
    return this.apis.get(`/api/v1/user/activate/${email}/${activate}`);
  }
}
