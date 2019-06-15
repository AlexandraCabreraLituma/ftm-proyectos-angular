import {Component, OnInit} from '@angular/core';
import {PublicationService} from '../shared/service/publication.service';
import {Publication} from '../shared/model/publication';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/model/user';
import {UserMinimo} from '../shared/model/user-minimo';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html'
})
export class PublicationComponent implements OnInit {
  reservaList: Publication[] = [];
  miStorage = window.sessionStorage;
  username = '';

  data: UserMinimo = {username: '', email: '', orcid: '', firstname: '', lastname: '', address: '' , phone : null};

  constructor(private publicationService: PublicationService, private  userService: UserService) {
   // console.log(this.username);
    this.reservaList = [];
    console.log(this.miStorage.getItem('username'));
  }

  ngOnInit() {
    this.username = this.miStorage.getItem('username');
    if (this.reservaList.length <= 0) {
      this.readRearchers(this.username);
    }


  }
  readRearchers(user) {
    this.userService.getUserName(user).subscribe(
      (res: User) => {
      //  console.log(res);
        this.data = res['user'];
        console.log(this.data.orcid);
        this.publicationService.readAll(this.data.orcid).subscribe(
          (respuesta) => {
            this.reservaList = respuesta;
          //  console.log(respuesta);
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
