import {Component, OnInit} from '@angular/core';
import {NominationView} from '../shared/model/nominationView';
import {FormBuilder} from '@angular/forms';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {NominationService} from '../shared/service/nomination.service';
import {HttpService} from '../shared/service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Nomination} from '../shared/model/nomination';
import {States} from '../shared/model/States';
import {ProjectProfile} from '../shared/model/projectprofile';
import {ProjectProfileView} from '../shared/model/projectsprofileView';

@Component({
  selector: 'app-nomination-candidate-view',
  templateUrl: './nomination-candidate-view.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationCandidateViewComponent implements OnInit {
  datos: NominationView[] = [];
  projecProfileView: ProjectProfileView;
  projecProfile: ProjectProfile = {id: null, project_id: null, profile_id: null, state : null };
  nomination: Nomination = {id: null, project_profile_id: null, user_id: null, state : null };
  isData = false;
  rejected = States.REJECTED;
  accepted = States.ACCEPTED;

  project_profile_id: string;
  constructor(private formBuilder: FormBuilder,
              private projectProfileService: ProjectprofileService,
              private nominationService: NominationService,
              private http: HttpService,
              private routerActive: ActivatedRoute,
              private router: Router) {


  }
  ngOnInit() {
    this.project_profile_id = this.routerActive.snapshot.paramMap.get('id');
    this.readNominationBYProjectProfileID(Number.parseInt(this.project_profile_id, 10));

  }

  updateNomination(nominationID, projectprofile, user, state) {
    this.nomination.id = nominationID;
    this.nomination.user_id = user;
    this.nomination.project_profile_id = projectprofile;
    this.nomination.state = state;
    this.nominationService.updateNomination(this.nomination).subscribe(response => {

      if (this.accepted === this.nomination.state) {
        this.updateProjectProfile(this.nomination.project_profile_id);
      }
      this.readNominationBYProjectProfileID(Number.parseInt(this.project_profile_id, 10));

    }, error => {
      console.log(error);
    });

  }
  updateProjectProfile(project_profile_id){
    this.projectProfileService.readProyecProfiletByID(project_profile_id).subscribe(
      (res: ProjectProfileView) => {
        this.projecProfileView = res['projectprofile'];
        this.projecProfile.id = this.projecProfileView.id;
        this.projecProfile.project_id = this.projecProfileView.project.id;
        this.projecProfile.profile_id = this.projecProfileView.profile.id;
        this.projecProfile.state = false;
        this.projectProfileService.updateProjectProfile(this.projecProfile).subscribe(response => {
        }, error => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openUser(user_id) {
    this.router.navigate(['/researcher', user_id]);
  }
  readNominationBYProjectProfileID(project_profile_id) {
    this.nominationService.readNominationByProjectProfileID(project_profile_id).subscribe(response => {
      this.isData = true;
      this.datos = response['nominations'];

    }, error => {
      this.isData = false;
    });
  }
}
