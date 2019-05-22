import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PublicationComponent} from './publication/publication.component';
import {UserComponent} from './user/user.component';
import {ProjectComponent} from './project/project.component';
import {ProjectViewComponent} from './project/project-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project-view', component: ProjectViewComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
