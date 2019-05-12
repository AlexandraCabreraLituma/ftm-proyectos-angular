import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  ismodal = false;
  isSeesion = false;
  notSeesion = true;

  constructor(private conex: UserService) {
    this.conex.validatorSession().subscribe(
      (respuesta) => {
        console.log(respuesta.toString());
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
    this.isSeesion = false;
    this.notSeesion = true;
  }

}
