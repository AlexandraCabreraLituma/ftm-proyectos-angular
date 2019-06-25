import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProfileService} from '../shared/service/profile.service';
import {ProjectService} from '../shared/service/project.service';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {HttpService} from '../shared/service/http.service';
import {NominationService} from '../shared/service/nomination.service';
import {NominationView} from '../shared/model/nominationView';

@Component({
  selector: 'app-user-nomination-view',
  templateUrl: './user-nomination-view.component.html',
  styleUrls: ['./user.component.css']
})
export class UserNominationViewComponent implements OnInit {
  datos: NominationView[] = [];
  isData = false;
  isModalDelete = false;
  userid: string;
  nominationId: string;
  titleModal: string;
  msgModal: string;
  isModalDeletePostulated = false;
  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private projectService: ProjectService,
              private projectProfileService: ProjectprofileService,
              private nominationService: NominationService,
              private http: HttpService) {

  }
  ngOnInit() {
    this.userid = this.http.showUserId();
    this.readNominationUser();
  }
  closeModal(){
    this.isModalDelete = false;
  }
  openModal(state: string) {
    console.log(state);
    if (state == 'postulated') {
      this.titleModal = 'Confirmation';
      this.msgModal = 'Do you want to delete your nomination?';
      this.isModalDeletePostulated = true;
   } else {
      this.titleModal = 'Error';
      this.msgModal = 'You can not delete the nomination';
      this.isModalDeletePostulated = false;
    }
    this.isModalDelete = true;
  }
  readNominationUser() {
    this.nominationService.readNominationByUser(Number.parseInt(this.userid, 10)).subscribe(response => {
      console.log(response);
      this.isData = true;
      this.datos = response['nominations'];

    }, error => {
      this.isData = false;
    });
  }
  deleteNomination(nominationID) {
    console.log(nominationID);
    this.nominationService.deleteNomination(nominationID).subscribe(response => {
      this.closeModal();
      this.readNominationUser();

     }, error => {
      console.log(error);
    });
  }

}
