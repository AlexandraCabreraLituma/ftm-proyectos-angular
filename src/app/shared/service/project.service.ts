import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpService: HttpService) { }

  saveProject(project: Project): Observable<Project> {
    return this.httpService.post(ApiEndpoint.PROJECTS, JSON.stringify(project));
  }

}
