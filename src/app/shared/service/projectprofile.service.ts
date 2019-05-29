import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {ProjectProfile} from '../model/projectprofile';

@Injectable({
  providedIn: 'root'
})
export class ProjectprofileService {

  constructor(private httpService: HttpService) { }

  saveProjectProfile(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.httpService.post(ApiEndpoint.PROJECTSPROFILE, JSON.stringify(projectProfile));
  }
}
