import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ApiEndpoint} from '../api-endpoint.model';
import {Nomination} from '../model/nomination';
import {NominationView} from '../model/nominationView';

@Injectable({
  providedIn: 'root'
})
export class NominationService {

  constructor(private httpService: HttpService) { }

  saveNomination(nomination: Nomination): Observable<Nomination> {
    return this.httpService.post(ApiEndpoint.NOMINATIONS, JSON.stringify(nomination));
  }
  readNominationByUser(userid: number): Observable<NominationView[]> {
    return this.httpService.get(ApiEndpoint.NOMINATIONS +  ApiEndpoint.USERS + '/' + userid);
  }
  readNominationByProjectProfileID(project_profile_id: number): Observable<NominationView[]> {
    return this.httpService.get(ApiEndpoint.NOMINATIONS +  ApiEndpoint.PROJECTSPROFILE + '/' + project_profile_id);
  }
  readNominationUserProjectProfileID(userid: number, project_profile_id: number): Observable<NominationView[]> {
    return this.httpService.get(ApiEndpoint.NOMINATIONS + ApiEndpoint.USERS + '/' + userid +  ApiEndpoint.PROJECTSPROFILE + '/' + project_profile_id);
  }

  updateNomination(nomination: Nomination): Observable<Nomination> {
    console.log(nomination);
    return this.httpService.put(ApiEndpoint.NOMINATIONS + '/' + nomination.id, nomination );
  }
  deleteNomination(nominationid: number): Observable<Nomination> {
    return this.httpService.delete(ApiEndpoint.NOMINATIONS + '/' + (nominationid));
  }
}
