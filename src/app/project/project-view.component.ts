import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {ProjectService} from '../shared/service/project.service';
import {Project} from '../shared/model/project';
import {Publication} from '../shared/model/publication';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectViewComponent implements OnInit {
  userid: string;
  miStorage = window.sessionStorage;
  data: Project[] = [];
  constructor(private projectService: ProjectService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
  }


  ngOnInit() {
    this.readProjectUser();
  }
  readProjectUser() {
    this.projectService.readProyectByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.data = projects['projects']
    );
  }
  readProyectUserEnabled() {
    this.projectService.readProyectByUserEnabled(Number.parseInt(this.userid, 10)).subscribe(
      projects => this.data = projects['projects']
    );
  }

}
