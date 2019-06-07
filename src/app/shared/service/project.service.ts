import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
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

  readProyectByUser(userid: number): Observable<Project[]> {
    return this.httpService.get(ApiEndpoint.PROJECTS +  ApiEndpoint.USERS + '/' + userid);
  }
  readProyectByUserEnabled(userid: number): Observable<Project[]> {
    return this.httpService.get(ApiEndpoint.PROJECTS + ApiEndpoint.USERS + ApiEndpoint.ENABLED + '/' + userid);
  }
  updateProject(project: Project): Observable<Project> {
    return this.httpService.put(ApiEndpoint.PROJECTS+ '/' + project.id, project );
  }

}
