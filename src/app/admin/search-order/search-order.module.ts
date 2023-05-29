import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { SearchOrderRoutingModule } from './search-order-routing.module';
import { SearchOrderComponent } from './search-order.component';




@NgModule({
  declarations: [ SearchOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    SearchOrderRoutingModule
  ],
  providers: [],
})
export class SearchOrderModule {}
