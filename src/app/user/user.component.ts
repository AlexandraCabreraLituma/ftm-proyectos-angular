import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {User} from './user';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';

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
  private orcid: string;
  private firstname: string;
  private lastname: string;
  private phone: number;
  private address: string;
  private advertenciaContresena = false;
  private reppassword: string;
  user: User;
  private isregistro = false;
  private isformulario = true;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

  //  this.homeUrl = data.homeUrl;
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
      vemail: ['', [Validators.required, Validators.email]],
      vpassword: ['', [Validators.required]],
      vreppassword: ['', [Validators.required]],
      vorcid: ['', [Validators.required]],
      vfirstname: ['', [Validators.required]],
      vlastname: ['', [Validators.required]],
      vphone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
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
      this.add();
      console.log("datos validos");

    }

  }

  add() {
    this.user = {username: this.username, password: this.password, email: this.email, orcid: this.orcid, firstname: this.firstname, lastname : this.lastname, phone: this.phone, address: this.address};
    this.userService.saveUser(this.user).subscribe(response => {
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
