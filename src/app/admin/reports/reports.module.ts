import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ReportsRoutingModule } from './reports-routing.module';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { LeaveReportService } from './leave-report/leave-report.service';
import { ExpenseReportComponent } from './expense/expense-report.component';
import { ExpenseReportService } from './expense/expense-report.service';

@NgModule({
  declarations: [LeaveReportComponent, ExpenseReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [LeaveReportService, ExpenseReportService],
})
export class ReportsModule {}
