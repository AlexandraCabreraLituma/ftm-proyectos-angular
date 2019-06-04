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
    console.log(userid);
    console.log('recurso');
    return this.httpService.get(ApiEndpoint.NOMINATIONS +  ApiEndpoint.USERS + '/' + userid);
  }

}
