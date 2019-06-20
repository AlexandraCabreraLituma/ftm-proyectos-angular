import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {ProjectProfile} from '../model/projectprofile';
import {ProjectProfileView} from '../model/projectsprofileView';
import {ProjectProfileSearch} from '../model/projectProfileSearch';
import {ProjectProfileSearchAdvance} from '../model/projectProfileSearchAdvance';

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
  readProyecProfiletByProject(project_id: Number): Observable<ProjectProfileView[]> {
    return this.httpService.get(ApiEndpoint.PROJECTSPROFILE + ApiEndpoint.PROJECTS + '/' + project_id);
  }
  readProyecProfiletByProfile(profile_id: Number): Observable<ProjectProfileView[]> {
    return this.httpService.get(ApiEndpoint.PROJECTSPROFILE + ApiEndpoint.PROFILES + '/' + profile_id);
  }
  readProyecProfiletSearch(projectProfile: ProjectProfileSearch): Observable<ProjectProfileView[]> {
    return this.httpService.post(ApiEndpoint.PROJECTSPROFILE + ApiEndpoint.SEARCH , JSON.stringify(projectProfile) );
  }
  updateProjectProfile(projectProfile: ProjectProfile): Observable<ProjectProfile> {
     return this.httpService.put(ApiEndpoint.PROJECTSPROFILE + '/' + projectProfile.id, projectProfile );
  }
  readProyecProfiletSearchAdvance(projectProfileAdvance: ProjectProfileSearchAdvance): Observable<ProjectProfileView[]> {
    return this.httpService.post(ApiEndpoint.PROJECTSPROFILE + ApiEndpoint.SEARCH + ApiEndpoint.ADVANCE , JSON.stringify(projectProfileAdvance) );
  }

}
