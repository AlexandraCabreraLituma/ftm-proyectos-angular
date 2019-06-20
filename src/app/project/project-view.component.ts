import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../shared/service/project.service';
import {Project} from '../shared/model/project';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectViewComponent implements OnInit {
  userid: string;
  miStorage = window.sessionStorage;
  data: Project[] = [];
  isData = false;
 project: Project = {id: null, title: null, description: null, key_words: null, initial_date: null, final_date: null, enabled: null, user_id: null };
  private title: string;
  private description: string;
  private category: string;
  private key_words: string;
  private initial_date: Date;
  private final_date: Date;
  constructor(private projectService: ProjectService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
  }


  ngOnInit() {
    this.readProjectUser();
  }
  readProjectUser() {
    this.projectService.readProyectByUser(Number.parseInt(this.userid, 10)).subscribe(
      projects => {
      this.isData = true;
      this.data = projects['projects'];
    }, error => {
      this.isData = false;
    });
  }
  readProyectUserEnabled() {
    this.projectService.readProyectByUserEnabled(Number.parseInt(this.userid, 10)).subscribe(
      projects => {
        this.isData = true;
        this.data = projects['projects'];
      }, error => {
        this.isData = false;
      });
  }
  updateProject(projectID, title, description, key_works, initial_date, final_date, state) {
    this.project.id = projectID;
    this.project.title = title;
    this.project.description = description;
    this.project.key_words = key_works;
    this.project.initial_date = initial_date;
    this.project.final_date = final_date;
    this.project.enabled = state;
    this.project.user_id = Number.parseInt(this.userid, 10);

    this.projectService.updateProject(this.project).subscribe(response => {
      this.readProjectUser();

    }, error => {
      console.log(error);
    });

  }

}
