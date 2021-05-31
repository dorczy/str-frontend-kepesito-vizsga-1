import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { ContributorsComponent } from './common/contributors/contributors.component';
import { RepositoriesListComponent } from './page/repositories-list/repositories-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContributorsComponent,
    RepositoriesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
