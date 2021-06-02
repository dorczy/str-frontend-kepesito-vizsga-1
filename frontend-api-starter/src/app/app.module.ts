import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { ContributorsComponent } from './common/contributors/contributors.component';
import { RepositoriesListComponent } from './page/repositories-list/repositories-list.component';
import { ContributorCardComponent } from './common/contributor-card/contributor-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContributorsComponent,
    RepositoriesListComponent,
    ContributorCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
