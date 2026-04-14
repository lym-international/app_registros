import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatesComponent } from "./candidates/candidates.component";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { ResumesComponent } from "./resumes/resumes.component";
import { ShortlistComponent } from "./shortlist/shortlist.component";

const routes: Routes = [
  {
    path: "jobs-list",
    component: JobsListComponent,
  },
  {
    path: "resumes",
    component: ResumesComponent,
  },
  {
    path: "candidates",
    component: CandidatesComponent,
  },
  {
    path: "shortlist",
    component: ShortlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
