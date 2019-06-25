import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../shared/service/project.service';
import {Project} from '../shared/model/project';
import {WorkingDay} from '../shared/model/workingDay';
import {Nivel} from '../shared/model/nivel';
import {ProjectSearch} from '../shared/model/proyectSearch';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectViewComponent implements OnInit {
  userid: string;
  miStorage = window.sessionStorage;
  data: Project[] = [];
  projectSearch: ProjectSearch
  isData = false;
  project: Project = {id: null, title: null, description: null, key_words: null, initial_date: null, final_date: null, enabled: null, user_id: null };
  title: string;
  description: string;
  key_words: string;
  state: boolean;
  initial_date: string;
  final_date: string;

  advertenciaFinalDate = false;
  constructor(private projectService: ProjectService) {
    console.log(this.miStorage.getItem('userId'));
    this.userid = this.miStorage.getItem('userId');
    this.key_words = '';
    this.state = true;
    this.title = '';
    this.initial_date = '';
    this.final_date = '';
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
  comparate() {
    if (this.initial_date > this.final_date) {
      this.advertenciaFinalDate = true;
    }
  }
  closeFinalDate() {
    this.advertenciaFinalDate = false;
  }
  readSearchProjectAdvance(){


      this.projectSearch = {
        enabled: this.state,
        user_id: Number.parseInt(this.userid, 10),
        title: this.title,
        key_words: this.key_words,
        initial_date: this.initial_date,
        final_date : this.final_date,
      };

      this.projectService.readProyectSearch(this.projectSearch).subscribe(response => {
        this.data = response['projects'];
        this.isData = true;
      }, error => {
        this.isData = false;
      });
    }


}
