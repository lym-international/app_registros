import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { SearchOrderRoutingModule } from './search-order-routing.module';
import { SearchOrderComponent } from './search-order.component';
import { OrderDataService } from 'app/_services/orderData.service'; //Diego

//material
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OcultarSidebarService } from 'app/_services/ocultar-sidebar.service';



@NgModule({
  declarations: [SearchOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    SearchOrderRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  
  providers: [OrderDataService, OcultarSidebarService],
})
export class SearchOrderModule {}
