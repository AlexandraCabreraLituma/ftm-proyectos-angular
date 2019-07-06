import {Injectable} from '@angular/core';
import {HttpApiOrcidService} from './http-api-orcid.service';
import {Observable} from 'rxjs';
import {Publication} from '../model/publication';
import {ApiEndpoint} from '../api-endpoint.model';
import {map} from 'rxjs/operators';


interface ObjRespone {
  group: string[];
}
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  publicationList: Publication[] = [];
  constructor(private httpService: HttpApiOrcidService) {
    this.publicationList = [];
  }

  readAll(corid): Observable<any> {
    this.publicationList = [] ;
      return this.httpService.get(corid, ApiEndpoint.WORKS).pipe(
        map( x => {
        //  if (this.publicationList.length <= 0 &&
          if (x.group.length > 0 ) {
            console.log('clea' + x.group.length);
            this.clean(x.group);
            return this.publicationList ;
            }
          //} else {
          //  return this.publicationList = [] ;
         // }
        })
      );
  }

  clean(res: any) {

    for (let i = 0; i < res.length; i++) {

      this.publicationList.push(
        {
          title: res[i]['work-summary'][0]['title'] == null ?  null : res[i]['work-summary'][0]['title']['title']['value'],
          tipo: res[i]['work-summary'][0]['type'] == null ?  null : res[i]['work-summary'][0]['type'],
          publicationDate: res[i]['work-summary'][0]['publication-date'] == null ?  null : res[i]['work-summary'][0]['publication-date']['year']['value'],
          url: res[i]['work-summary'][0]['url'] == null ? null : res[i]['work-summary'][0]['url']['value'] ,
          journalTitle : res[i]['work-summary'][0]['journal-title'] == null ? null : res[i]['work-summary'][0]['journal-title']['value'],

        }
      );
    }

  }



}

