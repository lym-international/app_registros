import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TaskRoutingModule } from './task-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgScrollbarModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ],
  declarations: [TaskComponent],
})
export class TaskModule {}
