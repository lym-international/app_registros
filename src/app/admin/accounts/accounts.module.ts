import { NgModule } from '@angular/core';
import { PaymentService } from './allpayment/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AllpaymentComponent } from './allpayment/allpayment.component';
import { FormDialogComponent } from './allpayment/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './allpayment/dialog/delete/delete.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { ComponentsModule } from '@shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AddPaymentComponent,
    InvoiceComponent,
    AllpaymentComponent,
    FormDialogComponent,
    DeleteDialogComponent,
],
    providers: [PaymentService],
})
export class AccountsModule {}

