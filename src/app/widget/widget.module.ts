import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';
import { WidgetRoutingModule } from './widget-routing.module';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { DataWidgetComponent } from './data-widget/data-widget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChartWidgetComponent, DataWidgetComponent],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    NgScrollbarModule,
    NgApexchartsModule,
    FormsModule,
    DragDropModule,
    NgChartsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class WidgetModule {}
