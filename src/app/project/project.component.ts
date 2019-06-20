import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/model/user';
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
  private key_words: string;
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
  }


  ngOnInit() {
     this.userid = this.http.showUserId();
     this.registerProjectForm = this.formBuilder.group({
      vtitle: ['', [Validators.required]],
      vdescription: ['', [Validators.required]],
      vkey_words: ['', [Validators.required]],
      vinitial_date: ['', [Validators.required]],
      vfinal_date: ['', [Validators.required]],
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
        console.log("datos validos registro project");
        this.add();

    }

  }

  add() {
    this.project = {title: this.title,
                    description: this.description,
                    key_words: this.key_words,
                    initial_date: this.initial_date,
                    final_date: this.final_date,
                    enabled: true,
                    user_id: Number.parseInt(this.userid, 10)
    };

    this.projectService.saveProject(this.project).subscribe(response => {
      console.log('regsitro Correcto');
      this.isregistro = true;
      this.isformulario = false;
     }, error => {
      this.isregistro = false;
      this.isformulario = true;
    });
  }


}
