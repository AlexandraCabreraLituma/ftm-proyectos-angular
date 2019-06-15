import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../shared/model/profile';
import {ProfileService} from '../shared/service/profile.service';
import {HttpService} from '../shared/service/http.service';
import {Project} from '../shared/model/project';
import {ProjectService} from '../shared/service/project.service';
import {ProjectProfile} from '../shared/model/projectprofile';
import {ProjectprofileService} from '../shared/service/projectprofile.service';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  private registerProjectProfileForm: FormGroup;
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
    this.registerProjectProfileForm = this.formBuilder.group({
      vproject: ['', [Validators.required]],
      vprofile: ['', [Validators.required]]
    });

  }
  get f() {
    return this.registerProjectProfileForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerProjectProfileForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
      console.log("datos validos registro project");
      console.log('project' + this.project_id);
      console.log('profile' + this.profile_id);
      this.add();
    }
  }

  readProfileUser() {
    this.profileService.readProfileByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.profiles = projects['profiles']
    );
  }
  readProjectUser() {
    this.projectService.readProyectByUserEnabled(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.proyects = projects['projects']
    );
  }
  add() {
    this.projectProfile = {
      project_id: this.project_id,
      profile_id: this.profile_id,
      state: true
    };

    this.projectProfileService.saveProjectProfile(this.projectProfile).subscribe(response => {
      console.log('regsitro Correcto');
      this.advertencia = false;
      this.isregistro = true;
    }, error => {
          if (error.code === 409) {
            this.advertencia = true;
            this.isregistro = false;
          }
      console.log('ERROR:', error.code);
    });
  }
  closewaring() {
    this.advertencia = false;
    this.isregistro = false;
  }
}
