import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/model/user';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';
import {PublicationService} from '../shared/service/publication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private advertenciaUserName = false;
  private advertenciaEmail = false;
  private advertenciaOrcid = false;
  private msgadvertencia = '';
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
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private publicationService: PublicationService) {

  }

  comparatePassword() {
    if (this.password !== this.reppassword) {
      this.advertenciaContresena = true;

    }
  }

  closeAdvertenciaPasword() {
    this.advertenciaContresena = false;
  }

  closeAdvertenciaUserName() {
    this.advertenciaUserName = false;
  }
  closeAdvertenciaEmail() {
    this.advertenciaEmail = false;
  }
  closeAdvertenciaOrcid() {
    this.advertenciaOrcid = false;
  }

  showUserName() {
    console.log(this.username);
    this.userService.getUserName(this.username).subscribe(
      (respuesta) => {
        this.msgadvertencia = 'User already exists';
        this.advertenciaUserName = true;
      },
      (error) => {
        console.log(error);
        if (error.status === 404){
          this.advertenciaUserName = false;
        } else if (error.status === 500) {
          this.msgadvertencia = 'Internal server error';
          this.advertenciaUserName = true;
        }

      }
    );
  }

  showEmail() {
    this.userService.getEmail(this.email).subscribe(
      (respuesta) => {
        this.msgadvertencia = 'Email already exists';
        this.advertenciaEmail = true;
      },
      (error) => {
        console.log(error);
        if (error.status === 404) {
          this.advertenciaEmail = false;
        } else if (error.status === 500) {
          this.msgadvertencia = 'Internal server error';
          this.advertenciaEmail = true;
        }

      }
    );
  }
  showOrcid() {

    this.publicationService.readAll(this.orcid).subscribe(
      (respuesta) => {
        this.userService.getOrcid(this.orcid).subscribe(
          (respuesta) => {
            this.msgadvertencia = 'ORCID  ready exists';
            this.advertenciaOrcid = true;
          },
          (error) => {
            console.log(error);
            if (error.status === 404) {
              this.advertenciaOrcid = false;
            } else if (error.status === 500) {
              this.msgadvertencia = 'Internal server error';
              this.advertenciaOrcid = true;
            }

          }
        );
      },
      (error) => {
        this.msgadvertencia = 'ORCID INVALID';
        this.advertenciaOrcid = true;
        console.log(error);
      }
    );

  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      vuserName: ['', [Validators.required]],
      vemail: ['', [Validators.required, Validators.email]],
      vpassword: ['', [Validators.required, Validators.minLength(5)]],
      vreppassword: ['', [Validators.required, Validators.minLength(5)]],
      vorcid: ['', [Validators.required, Validators.pattern('[0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}')]],
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
      if (this.advertenciaUserName === false && this.advertenciaOrcid === false && this.advertenciaEmail === false) {
        this.add();
      }
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
