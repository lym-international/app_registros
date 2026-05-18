import { NgModule } from '@angular/core';
import { MyProjectsService } from './projects/my-projects/my-projects.service';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClientRoutingModule } from './client-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';
// âœ… AGREGAR
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    BillingComponent,
    SettingsComponent,
    ChatComponent,
  ],
  imports: [
  CommonModule,
  BaseChartDirective,
  NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  NgScrollbarModule,
  ClientRoutingModule,
  NgApexchartsModule,
  ComponentsModule,   // â† esto trae TODO
],
  providers: [MyProjectsService],
})
export class ClientModule {}

