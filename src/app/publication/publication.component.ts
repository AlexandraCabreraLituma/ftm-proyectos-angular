import { Component, OnInit } from '@angular/core';
import {HttpApiOrcidService} from '../shared/service/http-api-orcid.service';
import {PublicationService} from './publication.service';
import {PublicationModel} from '../shared/model/publication-model';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  paper: PublicationModel = {title: null, tipo: null, publicationDate : null, url : null, journalTitle : null };
  reservaList: PublicationModel[] = [];

  constructor(private publicationService: PublicationService) {
    this.publicationService.readAll('0000-0002-3650-2964').subscribe(
      (res) => {
        console.log(res);
        this.clean(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  clean(res: any) {
    for (let i = 0; i < res.length; i++) {
      this.reservaList.push(
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

  ngOnInit() {
  }

}
