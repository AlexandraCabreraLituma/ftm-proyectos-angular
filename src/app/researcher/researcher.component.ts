import {Component, OnInit} from '@angular/core';
import {Publication} from '../shared/model/publication';
import {UserMinimo} from '../shared/model/user-minimo';
import {PublicationService} from '../shared/service/publication.service';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/model/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  reservaList: Publication[] = [];
  userID = '';

  data: UserMinimo = {username: '', email: '', orcid: '', firstname: '', lastname: '', address: '' , phone : null};

  constructor(private publicationService: PublicationService, private  userService: UserService, private routerActive: ActivatedRoute) {
    // console.log(this.username);
    this.reservaList = [];

  }

  ngOnInit() {
    this.userID = this.routerActive.snapshot.paramMap.get('id');
    this.readRearchers(Number.parseInt(this.userID, 10));

  }
  readRearchers(user: number) {
    this.userService.getUserId(user).subscribe(
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
