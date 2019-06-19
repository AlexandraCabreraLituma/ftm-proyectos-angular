import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {ApiEndpoint} from '../api-endpoint.model';
import {HttpService} from './http.service';
import {Profile} from '../model/profile';
import {ProfileSearch} from '../model/profileSearch';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpService: HttpService) { }

  saveProfile(profile: Profile): Observable<Profile> {
    return this.httpService.post(ApiEndpoint.PROFILES, JSON.stringify(profile));
  }

  readProfileByUser(userid: number): Observable<Profile[]> {
    return this.httpService.get(ApiEndpoint.PROFILES +  ApiEndpoint.USERS + '/' + userid);
  }
  readProfileSearch(profileSearch: ProfileSearch): Observable<Profile[]> {
    console.log(profileSearch);
    return this.httpService.post(ApiEndpoint.PROFILES +  ApiEndpoint.SEARCH , JSON.stringify(profileSearch));
  }
}
