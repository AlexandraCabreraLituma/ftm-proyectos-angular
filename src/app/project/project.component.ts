import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {User} from '../shared/model/user';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  private advertenciaUserName = false;
  private msgadvertencia = '';
  private registerProjectForm: FormGroup;
  private submitted = false;
  private title: string;
  private description: string;
  private category: string;
  private specific_objects: string;
  private initial_date: string;
  private final_date: string;
  private phone: number;

  private isregistro = false;
  private isformulario = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    //  this.homeUrl = data.homeUrl;
  }


  ngOnInit() {
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
    console.log(this.initial_date);
    if (this.initial_date > this.final_date) {
      console.log("fechas invalidas");

    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerProjectForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
      console.log("datos validos");
    }

  }

}
