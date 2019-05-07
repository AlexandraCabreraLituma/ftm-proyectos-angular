import { Injectable } from '@angular/core';
import {HttpApiOrcidService} from '../shared/service/http-api-orcid.service';
import {Observable} from 'rxjs';
import {PublicationModel} from '../shared/model/publication-model';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


interface ObjRespone {
  group: Array<Object>;
}
@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpService: HttpApiOrcidService) { }

  readAll(corid): Observable<any> {
    return this.httpService.get<ObjRespone>(corid, ApiEndpoint.WORKS).pipe(
      map( x => x.group)
    );
  }

}

