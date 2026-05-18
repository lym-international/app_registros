import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlankComponent } from './blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
    imports: [
    CommonModule,
    ExtraPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ProfileComponent,
    PricingComponent,
    InvoiceComponent,
    FaqsComponent,
    BlankComponent,
],
})
export class ExtraPagesModule {}
