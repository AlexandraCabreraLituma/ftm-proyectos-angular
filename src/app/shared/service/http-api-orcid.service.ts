import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, Subject, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Publication} from '../model/publication';
import {ReturnStatement} from '@angular/compiler';
import {ApiEndpoint} from '../api-endpoint.model';


@Injectable({
  providedIn: 'root'
})
export class HttpApiOrcidService {

  private token = '987b55b7-ea81-4e37-80c6-b08626ba3e3b';

  constructor(private http: HttpClient) { }

  get(corid, endpoint): Observable<any> {
       const headerDict = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(ApiEndpoint.API_ORCID + corid + endpoint, requestOptions);

  }

}
