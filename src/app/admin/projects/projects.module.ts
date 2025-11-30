import { TruncatePipe, PluralPipe } from './all-projects/core/pipes';
import { ProjectDialogComponent } from './all-projects/project-dialog/project-dialog.component';
import { BoardComponent } from './all-projects/board/board.component';
import { AllprojectsComponent } from './all-projects/all-projects.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormDialogComponent } from './estimates/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './estimates/dialog/delete/delete.component';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddprojectsComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ComponentsModule } from '@shared/components/components.module';
import { EstimatesComponent } from './estimates/estimates.component';
import { SharedModule } from '@shared';
import { EstimatesService } from './estimates/estimates.service';

@NgModule({
  declarations: [
    AddprojectsComponent,
    AllprojectsComponent,
    BoardComponent,
    ProjectDialogComponent,
    TruncatePipe,
    PluralPipe,
    ProjectDetailsComponent,
    EstimatesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [EstimatesService],
})
export class ProjectsModule {}
