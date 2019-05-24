import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {HttpService} from '../shared/service/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  ismodal = false;
  isSeesion = false;
  notSeesion = true;

  constructor(private conex: HttpService) {
    this.conex.validatorLogin().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.isSeesion = true;
        this.notSeesion = false;
      }
    );
  }

  ngOnInit() {
  }

  showmodal() {
    this.ismodal = true;
  }

  closemodal() {
    this.ismodal = false;
  }
  logout(){
    this.conex.logout();
    this.isSeesion = false;
    this.notSeesion = true;
  }

}
