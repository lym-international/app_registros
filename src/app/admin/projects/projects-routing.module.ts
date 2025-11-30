import { NgModule } from "@angular/core";
import { EstimatesComponent } from "./estimates/estimates.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AddprojectsComponent } from "./add-project/add-project.component";
import { AllprojectsComponent } from "./all-projects/all-projects.component";
const routes: Routes = [
  {
    path: "addProject",
    component: AddprojectsComponent,
  },
  {
    path: "allProjects",
    component: AllprojectsComponent,
  },
  {
    path: "estimates",
    component: EstimatesComponent,
  },
  {
    path: "projectDetails",
    component: ProjectDetailsComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
