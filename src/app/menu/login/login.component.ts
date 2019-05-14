import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {MenuComponent} from '../menu.component';
import {collectExternalReferences} from '@angular/compiler';
import {UserService} from '../../shared/service/user.service';

import {UserLogin} from '../../shared/model/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() MyEvent = new EventEmitter();
  private advertencia = false;

  private advertenciaMensaje = '';
  userlogin: UserLogin;
  constructor(private conex: UserService) {
  }

  closeModal(){
    this.MyEvent.emit();
  }
  closeAdvertencia(){
    this.advertencia = false;
  }

  showUser(user: string, pass: string) {
    this.userlogin = {username: user, password: pass};

    this.conex.login(this.userlogin).subscribe(
      (respuesta) => {
        console.log(respuesta);
         this.advertencia = false;
         this.MyEvent.emit();
      },
      (error) => {
          if (error.status === 422) {
            this.advertenciaMensaje = 'Debe ingresar todos los campos';
          } else if (error.status === 404){
            this.advertenciaMensaje = 'Usuario no existe';
          } else {
            this.advertenciaMensaje = 'ERROR SERVIDOR';
          }
          this.advertencia = true;
      }
    );

  }

  ngOnInit() {

  }

}
