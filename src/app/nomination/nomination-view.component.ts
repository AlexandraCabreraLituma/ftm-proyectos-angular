import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/model/user';
import {HttpService} from '../shared/service/http.service';

@Component({
  selector: 'app-nomination-view',
  templateUrl: './nomination-view.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationViewComponent implements OnInit {

  private datos: ProjectProfileView;
  private user: User;
  private validator = false;
  miStorage = window.sessionStorage;
  projectProfileID: string;
  userid: string;
  isLogin = true;
  constructor(private projectprofileService: ProjectprofileService,
              private routerActive: ActivatedRoute,
              private router: Router,
              private conex: HttpService) {

  //  console.log(this.projectProfileID);
    this.conex.validatorLogin().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.isLogin = false;
      }
    );

  }

  ngOnInit() {
    this.projectProfileID = this.routerActive.snapshot.paramMap.get('id');
    this.readProjectProfileById();
  }

  readProjectProfileById() {
    this.projectprofileService.readProyecProfiletByID(Number.parseInt(this.projectProfileID, 10)).subscribe
    (response  => {
      this.validator = true;
      this.datos = response['projectprofile'];
      this.user = response['projectprofile']['project']['user'];
     // console.log(response['projectprofile']['project']['user']);
    }, error => {
      console.log('ERROR:', error.code);
    });
  }
  openUser(user_id) {
    this.router.navigate(['/researcher', user_id]);

  }
}
