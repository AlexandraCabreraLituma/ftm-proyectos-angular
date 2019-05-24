import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {ApiEndpoint} from '../api-endpoint.model';
import {HttpService} from './http.service';
import {Profile} from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpService: HttpService) { }

  readProfileByUser(userid: number): Observable<Profile[]> {
    return this.httpService.get(ApiEndpoint.PROFILES +  ApiEndpoint.USERS + '/' + userid);
  }
}
