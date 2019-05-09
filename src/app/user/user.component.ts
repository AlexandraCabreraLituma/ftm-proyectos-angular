import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private advertenciaUsuario = false;
  private msgadvertenciaUsuario = '';
  private registerForm: FormGroup;
  private submitted = false;
  private username: string;
  private email: string;
  private password: string;
  private fecha: string;
  private timestamp: number;
  private isregistro = false;
  private isformulario = true;
  private advertenciaContresena = false;
  private reppassword: string;
  private newUser = {username: '', email: '', password: '', birthdate: null};
  private isVerificacionRegistro = false;
  private mensajeVerificacion: '';


  constructor(private formBuilder: FormBuilder) {
  }

  comparatePassword() {
    if (this.password != this.reppassword) {
      this.advertenciaContresena = true;

    }
  }

  closeAdvertenciaPasword() {
    this.advertenciaContresena = false;
  }

  closeAdvertencia() {
    this.advertenciaUsuario = false;
  }

  showUserName() {
    console.log(this.username);

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      vuserName: ['', [Validators.required]],
      vemail: ['', [Validators.required]],
      vpassword: ['', [Validators.required]],
      vreppassword: ['', [Validators.required]],
      vfecha: [''],
    });
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("datos invalidos");
      return;
    } else {
      console.log("datos validos");

    }

  }





}
