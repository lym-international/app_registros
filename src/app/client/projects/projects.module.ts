import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DeleteComponent } from './my-projects/dialogs/delete/delete.component';
import { FormDialogComponent } from './my-projects/dialogs/form-dialog/form-dialog.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    MyProjectsComponent,
    ProjectDetailsComponent,
    DeleteComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class ProjectsModule {}
