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
  isData = false;
  data: UserMinimo = {username: '', email: '', orcid: '', firstname: '', lastname: '', address: '' , phone : null};

  constructor(private publicationService: PublicationService, private  userService: UserService, private routerActive: ActivatedRoute) {

    this.reservaList = [];

  }

  ngOnInit() {
    this.userID = this.routerActive.snapshot.paramMap.get('id');
    this.readRearchers();

  }
  readRearchers() {
    console.log(Number.parseInt(this.userID, 10));
    this.userService.getUserId(Number.parseInt(this.userID, 10)).subscribe(
      (res: User) => {
        this.data = res['user'];
        console.log(this.data.orcid);
        this.publicationService.readAll(this.data.orcid).subscribe(
          (respuesta) => {
            console.log(respuesta);
            this.reservaList = respuesta;
            if (this.reservaList.length > 0 ) {
               this.isData = true;
             } else  {
               this.isData = false;
             }
         },
          (error) => {
            this.isData = false;
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
