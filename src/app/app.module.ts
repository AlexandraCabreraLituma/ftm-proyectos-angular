import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
import { PublicationComponent } from './publication/publication.component';
import {HttpApiOrcidService} from './shared/service/http-api-orcid.service';
import {PublicationService} from './publication/publication.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    PublicationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpApiOrcidService,
              PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
