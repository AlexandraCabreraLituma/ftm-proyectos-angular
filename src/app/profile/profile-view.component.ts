import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../shared/service/profile.service';
import {Profile} from '../shared/model/profile';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileViewComponent implements OnInit {

  userid: string;
  miStorage = window.sessionStorage;
  data: Profile[] = [];
  constructor(private profileService: ProfileService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
  }


  ngOnInit() {
    this.readProfileUser();
  }
  readProfileUser() {
    this.profileService.readProfileByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.data = projects['profiles']
    );
  }
}
