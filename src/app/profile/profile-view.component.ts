import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../shared/service/profile.service';
import {Profile} from '../shared/model/profile';
import {WorkingDay} from '../shared/model/workingDay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Nivel} from '../shared/model/nivel';
import {ProfileSearch} from '../shared/model/profileSearch';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileViewComponent implements OnInit {

  userid: string;
  miStorage = window.sessionStorage;
  data: Profile[] = [];
  name: string;
  working_day: string;
  nivel: string;
  searchProfileForm: FormGroup;
  submitted = false;
  user: number;
  isData = false;

  profileSearch: ProfileSearch;
  working_days: WorkingDay[] = [ WorkingDay.All, WorkingDay.FULLTIME, WorkingDay.PARTTIME];
  nivels: Nivel[] ;
  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
  //  this.user = Number.parseInt(this.userid, 10);
     this.nivels = [Nivel.ALL, Nivel.JUNIOR, Nivel.MASTER, Nivel.SENIOR ];
     this.name = '';
  }


  ngOnInit() {
    this.readProfileUser();
    this.searchProfileForm = this.formBuilder.group({
      vname: [''],
      vworking_day: ['', [Validators.required]],
      vnivel: ['', [Validators.required]]
    });
    // console.log(this.profiles[0]['name']);
  }
  get f() {
    return this.searchProfileForm.controls;
  }
  readProfileUser() {
    this.profileService.readProfileByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => {
        this.isData = true;
        this.data = projects['profiles'];
      }, error => {
        this.isData = false;
      });
  }

  readSearchProfile() {
    this.submitted = true;
    if (this.searchProfileForm.invalid) {
      console.log('datos invalidos');
      return;
    } else {

      this.profileSearch = {
        name: this.name,
        working_day: this.working_day === WorkingDay.All ? '' : this.working_day,
        nivel: this.nivel === Nivel.ALL ? '' : this.nivel,
        user_id: Number.parseInt(this.userid, 10)
      };

      this.profileService.readProfileSearch(this.profileSearch).subscribe(response => {
        this.data = response['profiles'];
        this.isData = true;
      }, error => {
        this.isData = false;
      });
    }
  }

}
