import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {User} from '../shared/model/user';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';
import {Project} from '../shared/model/project';
import {HttpService} from '../shared/service/http.service';
import {ProjectService} from '../shared/service/project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  private advertenciaFinalDate = false;
  private registerProjectForm: FormGroup;
  private submitted = false;
  private title: string;
  private description: string;
  private category: string;
  private specific_objects: string;
  private initial_date: Date;
  private final_date: Date;
  project: Project;
  userid: string;
  user: User;
  private isregistro = false;
  private isformulario = true;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private http: HttpService) {

    //  this.homeUrl = data.homeUrl;
  }


  ngOnInit() {
     this.userid = this.http.showUserId();
     this.registerProjectForm = this.formBuilder.group({
      vtitle: ['', [Validators.required]],
      vdescription: ['', [Validators.required]],
      vspecific_objects: ['', [Validators.required]],
      vinitial_date: ['', [Validators.required]],
      vfinal_date: ['', [Validators.required]],
      vcategory: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerProjectForm.controls;
  }

  comparate() {
    if (this.initial_date > this.final_date) {
      this.advertenciaFinalDate = true;
    }
  }
  closeFinalDate() {
    this.advertenciaFinalDate = false;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerProjectForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
        console.log("datos validos");
        this.add();
    }

  }

  add() {
    this.project = {title: this.title,
                    description: this.description,
                    specific_objectives: this.specific_objects,
                    initial_date: this.initial_date,
                    final_date: this.final_date,
                    enabled: true,
                    category: this.category,
                    user_id: Number.parseInt(this.userid, 10)};


    this.projectService.saveProject(this.project).subscribe(response => {
      console.log('regsitro Correcto');
      this.isregistro = true;
      this.isformulario = false;
    }, error => {
      this.isregistro = false;
      this.isformulario = true;
      console.log('ERROR:', error);
    });
  }


}
