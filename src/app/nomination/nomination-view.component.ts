import {Component, OnInit} from '@angular/core';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nomination-view',
  templateUrl: './nomination-view.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationViewComponent implements OnInit {

  private datos: ProjectProfileView;

  private validator = false;
  projectProfileID: string;
  constructor(private projectprofileService: ProjectprofileService, private router: ActivatedRoute) {

  //  console.log(this.projectProfileID);

  }

  ngOnInit() {
    this.projectProfileID = this.router.snapshot.paramMap.get('id');
    this.readProjectProfileById();
  }

  readProjectProfileById() {
    this.projectprofileService.readProyecProfiletByID(Number.parseInt(this.projectProfileID, 10)).subscribe
    (response  => {
      this.validator = true;
      this.datos = response['projectprofile'];
    }, error => {
      console.log('ERROR:', error.code);
    });
  }
}
