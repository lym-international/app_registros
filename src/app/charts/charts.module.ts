import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsRoutingModule } from './charts-routing.module';
import { EchartComponent } from './echart/echart.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { ApexchartComponent } from './apexchart/apexchart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxchartComponent } from './ngxchart/ngxchart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GaugeComponent } from './gauge/gauge.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
    imports: [
    CommonModule,
    ChartsRoutingModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
    }),
    BaseChartDirective,
    NgxChartsModule,
    NgApexchartsModule,
    NgxGaugeModule,
    ComponentsModule,
    EchartComponent,
    ChartjsComponent,
    ApexchartComponent,
    NgxchartComponent,
    GaugeComponent,
],
})
export class ChartsModule {}
