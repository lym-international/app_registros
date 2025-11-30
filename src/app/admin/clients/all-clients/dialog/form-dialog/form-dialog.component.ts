import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { ClientsService } from '../../clients.service';
import { Clients } from '../../clients.model';

export interface DialogData {
  id: number;
  action: string;
  clients: Clients;
}
@Component({
  selector: 'app-form-dialog:not(b)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  clientForm: UntypedFormGroup;
  clients: Clients;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public clientService: ClientsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.clients.name;
      this.clients = data.clients;
    } else {
      this.dialogTitle = 'New Client';
      const blankObject = {} as Clients;
      this.clients = new Clients(blankObject);
    }
    this.clientForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.clients.id],
      img: [this.clients.img],
      name: [this.clients.name],
      email: [this.clients.email],
      mobile: [this.clients.mobile],
      company_name: [this.clients.company_name],
      currency: [this.clients.currency],
      billing_method: [this.clients.billing_method],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.clientService.addClient(this.clientForm.getRawValue());
  }
}
