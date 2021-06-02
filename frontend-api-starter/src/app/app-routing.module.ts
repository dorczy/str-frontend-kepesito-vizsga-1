import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RepositoriesListComponent } from './page/repositories-list/repositories-list.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "repositories/:name",
    component: RepositoriesListComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
