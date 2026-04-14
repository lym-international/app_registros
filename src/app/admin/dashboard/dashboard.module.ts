import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '@shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    DashboardRoutingModule,
    BaseChartDirective,
    NgApexchartsModule,
    NgScrollbarModule,
    ComponentsModule,
    MainComponent, Dashboard2Component,
],
})
export class DashboardModule {}
