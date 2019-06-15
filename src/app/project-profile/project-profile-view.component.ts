import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {Project} from '../shared/model/project';
import {ProfileService} from '../shared/service/profile.service';
import {ProjectService} from '../shared/service/project.service';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {HttpService} from '../shared/service/http.service';
import {ProjectProfileSearch} from '../shared/model/projectProfileSearch';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileMinimo} from '../shared/model/profile-minimo';

@Component({
  selector: 'app-project-profile-view',
  templateUrl: './project-profile-view.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileViewComponent implements OnInit {
  data: ProjectProfileView[] = [];
  searchProjectProfileForm: FormGroup;
  isData = false;
  submitted = false;
  private project_id: string;
  private profile_id: string;
  userid: string;
  projectProfile: ProjectProfileSearch;
  profileInitial: ProfileMinimo = {id: null , name: 'All Profile'} ;
  profiles: ProfileMinimo[] = [];
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
    this.userid = this.http.showUserId();
    this.readProfileUser();
    this.readProjectUser();
   // this.profiles.push(this.profileInitial);

  }
  ngOnInit() {


    this.searchProjectProfileForm = this.formBuilder.group({
      vprojects: ['', [Validators.required]],
      vprofiles: [''],
      vstate: ['']
    });
   // console.log(this.profiles[0]['name']);
  }
  get f() {
    return this.searchProjectProfileForm.controls;
  }
  readProfileUser() {

    this.profileService.readProfileByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => {
        this.profiles = projects['profiles'];
        this.profiles.push(this.profileInitial);
        this.profiles.reverse();
      }
    );
  }
  readProjectUser() {
    this.projectService.readProyectByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => {
        this.proyects = projects['projects'];
        //this.proyects.push()
      }
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
    this.submitted = true;
    if (this.searchProjectProfileForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
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
  }

  openNomination(project_profile_id) {
  //  console.log(project_profile_id);
    this.router.navigate(['/nomination-candidate-view', project_profile_id]);
  }
}
