import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {ProjectProfile} from '../model/projectprofile';
import {ProjectProfileView} from '../model/projectsprofileView';

@Injectable({
  providedIn: 'root'
})
export class ProjectprofileService {

  constructor(private httpService: HttpService) { }

  saveProjectProfile(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.httpService.post(ApiEndpoint.PROJECTSPROFILE, JSON.stringify(projectProfile));
  }
  readProyecProfiletByState(state: Boolean): Observable<ProjectProfileView[]> {
    return this.httpService.get(ApiEndpoint.PROJECTSPROFILE +  ApiEndpoint.STATES + '/' + state);
  }
  readProyecProfiletByID(id: Number): Observable<ProjectProfileView> {
    return this.httpService.get(ApiEndpoint.PROJECTSPROFILE + '/' + id);
  }

}
