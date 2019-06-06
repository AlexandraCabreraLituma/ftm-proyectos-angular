import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {PublicationComponent} from './publication/publication.component';
import {HttpApiOrcidService} from './shared/service/http-api-orcid.service';
import {PublicationService} from './shared/service/publication.service';
import {UserComponent} from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './shared/service/user.service';
import {HttpService} from './shared/service/http.service';
import {LoginComponent} from './menu/login/login.component';
import {ProjectComponent} from './project/project.component';
import {ProjectService} from './shared/service/project.service';
import {ProjectViewComponent} from './project/project-view.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileService} from './shared/service/profile.service';
import {ProfileViewComponent} from './profile/profile-view.component';
import {ProjectProfileComponent} from './project-profile/project-profile.component';
import {ProjectprofileService} from './shared/service/projectprofile.service';
import {NominationComponent} from './nomination/nomination.component';
import {NominationViewComponent} from './nomination/nomination-view.component';
import {ResearcherComponent} from './researcher/researcher.component';
import {ProjectProfileViewComponent} from './project-profile/project-profile-view.component';
import {UserNominationViewComponent} from './user/user-nomination-view.component';
import {NominationCandidateViewComponent} from './nomination/nomination-candidate-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    PublicationComponent,
    UserComponent,
    LoginComponent,
    ProjectComponent,
    ProjectViewComponent,
    ProfileComponent,
    ProfileViewComponent,
    ProjectProfileComponent,
    NominationComponent,
    NominationViewComponent,
    ResearcherComponent,
    ProjectProfileViewComponent,
    UserNominationViewComponent,
    NominationCandidateViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpApiOrcidService,
              PublicationService,
              UserService,
              ProjectService,
              ProfileService,
              ProjectprofileService,
              HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
