import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {User} from '../../user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  saveUser(user: User): Observable<User> {
    console.log(user);
    return this.httpService.post(ApiEndpoint.USERS, JSON.stringify(user));
  }
}
