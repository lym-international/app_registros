import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClientRoutingModule } from './client-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProjectsService } from './projects/my-projects/my-projects.service';
import { ComponentsModule } from '../shared/components/components.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    BillingComponent,
    SettingsComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    ClientRoutingModule,
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [MyProjectsService],
})
export class ClientModule {}
