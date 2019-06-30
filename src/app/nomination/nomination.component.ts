import {Component, OnInit} from '@angular/core';
import {ProjectprofileService} from '../shared/service/projectprofile.service';
import {ProjectProfileView} from '../shared/model/projectsprofileView';
import {Router} from '@angular/router';
import {WorkingDay} from '../shared/model/workingDay';
import {Nivel} from '../shared/model/nivel';
import {ProjectProfileSearchAdvance} from '../shared/model/projectProfileSearchAdvance';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {
  isData = false;
  projectProfileSearchAdvance: ProjectProfileSearchAdvance;
  name: string;
  working_day: string;
  nivel: string;
  title: string;
  private initial_date: string;
  private final_date: string;
  working_days: WorkingDay[] = [ WorkingDay.All, WorkingDay.FULLTIME, WorkingDay.PARTTIME];
  nivels: Nivel[] = [Nivel.ALL, Nivel.JUNIOR, Nivel.MASTER, Nivel.SENIOR ];
  data: ProjectProfileView[] = [];
  private advertenciaFinalDate = false;
  constructor( private router: Router, private projectprofileService: ProjectprofileService) {
    this.name = '';
    this.working_day = '';
    this.name = '';
    this.title = '';
    this.nivel = '';
    this.initial_date = '';
    this.final_date = '';

  }

  ngOnInit() {
    this.readSearchProjectProfileAdvance();
  }
  readProfileUser() {
    this.projectprofileService.readProyecProfiletByState(true).subscribe
      (response => {
        this.data = response['projectsprofiles'];
        this.isData = true;
      }, error => {
        this.isData = false;
        console.log('ERROR:', error);
      });
  }
  openProfile(profile_id) {
      this.router.navigate(['/nomination-view', profile_id]);
  }

  readSearchProjectProfileAdvance() {

      this.projectProfileSearchAdvance = {
        state: true,
        working_day: this.working_day === WorkingDay.All ? '' : this.working_day,
        nivel: this.nivel === Nivel.ALL ? '' : this.nivel,
        name: this.name,
        title: this.title,
        initial_date: this.initial_date,
        final_date : this.final_date,
      };

      this.projectprofileService.readProyecProfiletSearchAdvance(this.projectProfileSearchAdvance).subscribe(response => {
        this.data = response['projectsprofiles'];
        console.log(response);
        this.isData = true;
      }, error => {
        this.isData = false;
      });
  }
  comparate() {
    if (this.initial_date > this.final_date) {
      this.advertenciaFinalDate = true;
    }
  }
  closeFinalDate() {
    this.advertenciaFinalDate = false;
  }

}
