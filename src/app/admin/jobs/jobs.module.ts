import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { DeleteDialogComponent } from './jobs-list/dialogs/delete/delete.component';
import { FormDialogComponent } from './jobs-list/dialogs/form-dialog/form-dialog.component';
import { JobsListService } from './jobs-list/jobs-list.service';
import { ResumesComponent } from './resumes/resumes.component';
import { DeleteDialogComponent as ResumeDeleteComponent } from './resumes/dialogs/delete/delete.component';
import { FormDialogComponent as ResumeFormDialogComponent } from './resumes/dialogs/form-dialog/form-dialog.component';
import { ResumesService } from './resumes/resumes.service';
import { CandidatesComponent } from './candidates/candidates.component';
import { DeleteDialogComponent as CandidatesDeleteComponent } from './candidates/dialogs/delete/delete.component';
import { FormDialogComponent as CandidatesFormDialogComponent } from './candidates/dialogs/form-dialog/form-dialog.component';
import { CandidatesService } from './candidates/candidates.service';
import { ShortlistComponent } from './shortlist/shortlist.component';
import { DeleteDialogComponent as ShortlistDeleteComponent } from './shortlist/dialogs/delete/delete.component';
import { FormDialogComponent as ShortlistFormDialogComponent } from './shortlist/dialogs/form-dialog/form-dialog.component';
import { ShortlistService } from './shortlist/shortlist.service';

@NgModule({
  declarations: [
    JobsListComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    ResumesComponent,
    ResumeDeleteComponent,
    ResumeFormDialogComponent,
    CandidatesComponent,
    CandidatesDeleteComponent,
    CandidatesFormDialogComponent,
    ShortlistComponent,
    ShortlistDeleteComponent,
    ShortlistFormDialogComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [
    JobsListService,
    ResumesService,
    CandidatesService,
    ShortlistService,
  ],
})
export class JobsModule {}
