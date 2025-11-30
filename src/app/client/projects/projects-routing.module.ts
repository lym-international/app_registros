import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
  {
    path: 'myProjects',
    component: MyProjectsComponent,
  },
  {
    path: 'projectDetails',
    component: ProjectDetailsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
