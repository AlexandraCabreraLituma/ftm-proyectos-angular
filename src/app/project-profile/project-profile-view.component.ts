import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Profile} from '../shared/model/profile';
import {Project} from '../shared/model/project';
import {ProfileService} from '../shared/service/profile.service';
import {ProjectService} from '../shared/service/project.service';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {HttpService} from '../shared/service/http.service';
import {ProjectProfileSearch} from '../shared/model/projectProfileSearch';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-profile-view',
  templateUrl: './project-profile-view.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileViewComponent implements OnInit {
  data: ProjectProfileView[] = [];
  private registerProjectProfileForm: FormGroup;
  isData = false;
  private submitted = false;
  private project_id: string;
  private profile_id: string;
  private advertencia = false;
  userid: string;
  projectProfile: ProjectProfileSearch;
  private isregistro = false;
  profiles: Profile[] = [];
  proyects: Project[] = [];
  state: true;
  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private projectService: ProjectService,
              private projectProfileService: ProjectprofileService,
              private http: HttpService,
              private routerActive: ActivatedRoute,
              private router: Router) {
    this.state = true;

  }
  ngOnInit() {
    this.userid = this.http.showUserId();
    this.readProjectUser();
    this.readProfileUser();
  }
  readProfileUser() {
    this.profileService.readProfileByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.profiles = projects['profiles']
    );
  }
  readProjectUser() {
    this.projectService.readProyectByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.proyects = projects['projects']
    );
  }
  readProjectProfileByProyect() {
    this.projectProfileService.readProyecProfiletByProject(Number.parseInt(this.project_id , 10)).subscribe(response => {
      console.log(response);
      this.data = response['projectsprofiles']
      this.isData = true;
    }, error => {
        this.isData = false;
    });
  }
  readProjectProfileByProfile() {
    this.projectProfileService.readProyecProfiletByProfile(Number.parseInt(this.profile_id , 10)).subscribe(response => {
      console.log(response);
      this.data = response['projectsprofiles']
      this.isData = true;
    }, error => {
      this.isData = false;
    });
  }
  readSearch() {
    this.projectProfile = {
      project_id: this.project_id == null ? '' : this.project_id,
      profile_id: this.profile_id == null ? '' : this.profile_id,
      state: this.state
    };

    this.projectProfileService.readProyecProfiletSearch(this.projectProfile).subscribe(response => {
      this.data = response['projectsprofiles']
      this.isData = true;
    }, error => {
        this.isData = false;
    });
  }

  openNomination(project_profile_id) {
  //  console.log(project_profile_id);
    this.router.navigate(['/nomination-candidate-view', project_profile_id]);
  }
}
