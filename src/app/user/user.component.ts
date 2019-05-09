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
  private advertenciaContresena = false;
  private reppassword: string;
  private newUser = {username: '', password: '', email: '', orcid: '', firstname: '', lastname : '', phone: 0, address: ''};
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
      vorcid: ['', [Validators.required]],
      vfirstname: ['', [Validators.required]],
      vlastname: ['', [Validators.required]],
      vphone: ['', [Validators.required]],
      vaddress: ['', [Validators.required]],
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
