import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from './tables-routing.module';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialTableComponent } from './material-table/material-table.component';
import { ComponentsModule } from '../shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablesRoutingModule,
    NgxDatatableModule,
    ComponentsModule,
    BasicTableComponent,
    NgxDatatableComponent,
    MaterialTableComponent,
],
})
export class TablesModule {}
