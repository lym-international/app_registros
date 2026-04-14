import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { GoogleComponent } from './google/google.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        MapsRoutingModule,
        ComponentsModule,
        GoogleMapsModule,
        GoogleComponent,
    ],
})
export class MapsModule {}
