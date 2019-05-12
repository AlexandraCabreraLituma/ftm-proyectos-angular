import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {MenuComponent} from '../menu.component';
import {collectExternalReferences} from '@angular/compiler';
import {UserService} from '../../shared/service/user.service';

import {UserLogin} from '../../user/user-login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() MyEvent = new EventEmitter();
  private advertencia = false;
  private mytoken: string;
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
  settoken(mytoken){
    this.mytoken = mytoken;
    console.log(this.mytoken);
  }

  showUser(user: string, pass: string) {
    this.userlogin = {username: user, password: pass};

    this.conex.login(this.userlogin).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.mytoken ='123456';
        this.settoken(this.mytoken);
        this.conex.addSession(this.mytoken);
        this.advertencia = false;
         console.log(respuesta);
         this.advertencia = false;
         this.MyEvent.emit();
      },
      (error) => {
          console.log(error);
          /*
          if(error.status == 400)
          {
            this.advertenciaMensaje = 'Debe ingresar todos los campos';
          } else if (error.status == 401)
          {
            this.advertenciaMensaje = 'Usuario no existe';
          } else {
            this.advertenciaMensaje = 'ERROR SERVIDOR';
          }*/
          this.advertencia = true;
      }
    );

  }

  ngOnInit() {

  }

}
