import {Component, OnInit} from '@angular/core';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ProjectProfileView} from '../shared/model/projectsprofileView';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  userid: string;
  miStorage = window.sessionStorage;
  data: ProjectProfileView[] = [];
  constructor(private projectprofileService: ProjectprofileService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
  }


  ngOnInit() {
    this.readProfileUser();
  }
  readProfileUser() {
    this.projectprofileService.readProyecProfiletByState(true).subscribe
      (response => {
        this.data = response['projectsprofiles'];
        console.log(response);
      }, error => {
        console.log('ERROR:', error);
      });
  }
  openProfile(profile_id) {
      console.log(profile_id);
  }


}
