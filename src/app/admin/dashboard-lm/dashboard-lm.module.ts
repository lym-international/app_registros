import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { DashboardLmRoutingModule } from './dashboard-lm-routing.module';
import { DashboardLmComponent } from './dashboard-lm.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { OrderDataService } from 'app/_services/orderData.service';

//material
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [DashboardLmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    DashboardLmRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgApexchartsModule,
    NgScrollbarModule
  ],
  
  providers: [OrderDataService],
})
export class DashboardLmModule {}
