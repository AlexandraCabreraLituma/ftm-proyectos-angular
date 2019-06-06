import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PublicationComponent} from './publication/publication.component';
import {UserComponent} from './user/user.component';
import {ProjectComponent} from './project/project.component';
import {ProjectViewComponent} from './project/project-view.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileViewComponent} from './profile/profile-view.component';
import {ProjectProfileComponent} from './project-profile/project-profile.component';
import {NominationComponent} from './nomination/nomination.component';
import {NominationViewComponent} from './nomination/nomination-view.component';
import {ResearcherComponent} from './researcher/researcher.component';
import {ProjectProfileViewComponent} from './project-profile/project-profile-view.component';
import {UserNominationViewComponent} from './user/user-nomination-view.component';
import {NominationCandidateViewComponent} from './nomination/nomination-candidate-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project-view', component: ProjectViewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-view', component: ProfileViewComponent },
  { path: 'project-profile', component: ProjectProfileComponent },
  { path: 'project-profile-view', component: ProjectProfileViewComponent},
  { path: 'nomination', component: NominationComponent },
  { path: 'user-nomination-view', component: UserNominationViewComponent },
  { path: 'nomination-view/:id', component: NominationViewComponent },
  { path: 'researcher/:id', component: ResearcherComponent },
  { path: 'nomination-candidate-view/:id', component: NominationCandidateViewComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
