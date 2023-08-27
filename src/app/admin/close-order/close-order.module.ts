import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { OrderDataService } from 'app/_services/orderData.service';

import { CloseOrderRoutingModule } from './close-order-routing.module';
import { CloseOrderComponent } from './close-order.component';
//material
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';





@NgModule({
  declarations: [CloseOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgApexchartsModule,
    NgScrollbarModule,
    CloseOrderRoutingModule
  ],
  
  providers: [OrderDataService],
})
export class CloseOrderModule {}
