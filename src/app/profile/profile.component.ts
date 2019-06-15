import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/model/user';
import {HttpService} from '../shared/service/http.service';
import {Profile} from '../shared/model/profile';
import {ProfileService} from '../shared/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private registerProfileForm: FormGroup;
  private submitted = false;
  private name: string;
  private description: string;
  private working_day: string;
  private nivel: string;

  profile: Profile;
  userid: string;
  user: User;
  private isregistro = false;

  working_days = ['Full time', 'Part time', 'Others'];
  nivels = ['Junior', 'Senior', 'Master'];
  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private http: HttpService) {

  }

  ngOnInit() {
    this.userid = this.http.showUserId();
    this.registerProfileForm = this.formBuilder.group({
      vname: ['', [Validators.required]],
      vdescription: ['', [Validators.required]],
      vworking_day: ['', [Validators.required]],
      vnivel: ['', [Validators.required]]});
  }
  get f() {
    return this.registerProfileForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerProfileForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
      console.log("datos validos registro project");
      this.add();

    }

  }
  add() {
    this.profile = {name: this.name,
      description: this.description,
      working_day: this.working_day,
      nivel: this.nivel,
      user_id: Number.parseInt(this.userid, 10)
    };

    this.profileService.saveProfile(this.profile).subscribe(response => {
      console.log('regsitro Correcto');
      this.isregistro = true;
    }, error => {
      this.isregistro = false;
      console.log('ERROR:', error);
    });
  }

}
