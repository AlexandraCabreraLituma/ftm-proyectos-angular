import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {User} from '../model/user';
import {UserLogin} from '../model/user-login';
import {Subject, Subscription} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) { }

  saveUser(user: User): Observable<User> {
    console.log(user);
    return this.httpService.post(ApiEndpoint.USERS, JSON.stringify(user));
  }

  login(user: UserLogin): Observable<any> {
    return this.httpService.login(ApiEndpoint.USERS + ApiEndpoint.LOGIN, JSON.stringify(user));
  }
  getUserId(userid: number): Observable<User> {
    return this.httpService.get(ApiEndpoint.USERS +  '/' + userid);
  }
  getUserName(userName: string): Observable<User> {
    return this.httpService.get(ApiEndpoint.USERS + ApiEndpoint.USERNAME + '/' + userName);
  }
  getEmail(email: string) {
    return this.httpService.get(ApiEndpoint.USERS + ApiEndpoint.EMAIL + '/' + email);
  }
  getOrcid(orcid: string) {
    return this.httpService.get(ApiEndpoint.USERS + ApiEndpoint.ORCID + '/' + orcid);
  }

}
