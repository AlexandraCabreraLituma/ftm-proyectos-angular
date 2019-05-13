import { Component, OnInit } from '@angular/core';
import {HttpApiOrcidService} from '../shared/service/http-api-orcid.service';
import {PublicationService} from './publication.service';
import {PublicationModel} from '../shared/model/publication-model';
import {UserService} from '../shared/service/user.service';
import {User} from '../user/user';
import {UserMinimo} from './user-minimo';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  paper: PublicationModel = {title: null, tipo: null, publicationDate : null, url : null, journalTitle : null };
  reservaList: PublicationModel[] = [];
  miStorage = window.sessionStorage;
  username = '';
  data: UserMinimo = {username: '', email: '', orcid: ''};

  constructor(private publicationService: PublicationService, private  userService: UserService) {
    console.log(this.username);

    console.log(this.miStorage.getItem('username'));
    this.username = this.miStorage.getItem('username');
  }

  ngOnInit() {
    this.userService.getUserName(this.username).subscribe(
      (res: User) => {
        console.log(res);
        this.data = res['user'];
        console.log(this.data.orcid);
        this.publicationService.readAll(this.data.orcid).subscribe(
          (respuesta) => {
            this.reservaList = respuesta;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
