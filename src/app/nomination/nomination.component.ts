import {Component, OnInit} from '@angular/core';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  data: ProjectProfileView[] = [];
  constructor( private router: Router, private projectprofileService: ProjectprofileService) {
  }

  ngOnInit() {
    this.readProfileUser();
  }
  readProfileUser() {
    this.projectprofileService.readProyecProfiletByState(true).subscribe
      (response => {
        this.data = response['projectsprofiles'];
      }, error => {
        console.log('ERROR:', error);
      });
  }
  openProfile(profile_id) {
      this.router.navigate(['/nomination-view', profile_id]);
  }


}
