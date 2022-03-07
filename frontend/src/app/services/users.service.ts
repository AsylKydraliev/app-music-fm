import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUser){
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('displayName', userData.displayName);
    formData.append('password', userData.password);

    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }

    return this.http.post<User>(environment.apiUrl + '/users', formData);
  }
}
