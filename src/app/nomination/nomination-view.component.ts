import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/model/user';
import {HttpService} from '../shared/service/http.service';
import {Nomination} from '../shared/model/nomination';
import {NominationService} from '../shared/service/nomination.service';

@Component({
  selector: 'app-nomination-view',
  templateUrl: './nomination-view.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationViewComponent implements OnInit {

  private datos: ProjectProfileView;
  private user: User;
  private validator = false;
  private isregistro = false;
  private advertencia = false;
  miStorage = window.sessionStorage;
  projectProfileID: string;
  nomination: Nomination;
  userid: number;
  isLogin = true;
  isModal = false;
  msgTitle: String;
  constructor(private projectprofileService: ProjectprofileService,
              private routerActive: ActivatedRoute,
              private router: Router,
              private conex: HttpService,
              private nominationService: NominationService) {


    this.msgTitle = 'You need to start session';
  }

  ngOnInit() {
    console.log(this.conex.showUserId());
    if (this.conex.showUserId() !== null) {
      this.isLogin = false;
    }{
      this.userid = Number.parseInt(this.conex.showUserId(), 10) ;
    }

     this.projectProfileID = this.routerActive.snapshot.paramMap.get('id');
    this.readProjectProfileById();
    this.readNominationUserProjectProfile();
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
  readNominationUserProjectProfile() {
    this.nominationService.readNominationUserProjectProfileID(
                            this.userid,
                            Number.parseInt(this.projectProfileID, 10)).subscribe
    (response  => {
         // console.log('existe un registro')
        //  console.log(response);
          this.isLogin = true;
          this.msgTitle = 'You have a postulated';

      // console.log(response['projectprofile']['project']['user']);
    }, error => {
      console.log('ERROR:', error.code);
    });
  }
  openUser(user_id) {
    this.router.navigate(['/researcher', user_id]);
  }
  add(project_profile_id: number) {
    console.log('add' + this.userid);

    this.nomination = {
      project_profile_id: project_profile_id,
      user_id: this.userid,
    };

    this.nominationService.saveNomination(this.nomination).subscribe(response => {
      console.log('regsitro Correcto');
      this.advertencia = false;
      this.isregistro = true;
      this.isLogin = true;
      this.msgTitle = '';
    }, error => {
      if (error.code === 409) {
        this.advertencia = true;
        this.isregistro = false;
      }
      console.log('ERROR:', error.code);
    });
  }
  closeModal(){
    this.isModal = false;
  }
}
