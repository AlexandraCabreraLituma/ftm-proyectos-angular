import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectProfile} from '../shared/model/projectprofile';
import {Profile} from '../shared/model/profile';
import {Project} from '../shared/model/project';
import {ProfileService} from '../shared/service/profile.service';
import {ProjectService} from '../shared/service/project.service';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {HttpService} from '../shared/service/http.service';

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
  private project_id: number;
  private profile_id: number;
  private advertencia = false;
  userid: string;
  projectProfile: ProjectProfile;
  private isregistro = false;
  profiles: Profile[] = [];
  proyects: Project[] = [];
  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private projectService: ProjectService,
              private projectProfileService: ProjectprofileService,
              private http: HttpService) {

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
    this.projectProfileService.readProyecProfiletByProject(this.project_id).subscribe(response => {
      console.log(response);
      this.data = response['projectsprofiles']
      this.isData = true;
    }, error => {
        this.isData = false;
    });
  }
  readProjectProfileByProfile() {
    this.projectProfileService.readProyecProfiletByProfile(this.project_id).subscribe(response => {
      console.log(response);
      this.data = response['projectsprofiles']
      this.isData = true;
    }, error => {
      this.isData = false;
    });
  }

}