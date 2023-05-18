import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LeadsService } from '../../leads.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Leads } from '../../leads.model';

export interface DialogData {
  id: number;
  action: string;
  leads: Leads;
}

@Component({
  selector: 'app-form-dialog:not(i)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  leadsForm: UntypedFormGroup;
  leads: Leads;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leadsService: LeadsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.leads.name;
      this.leads = data.leads;
    } else {
      this.dialogTitle = 'New Leads';
      const blankObject = {} as Leads;
      this.leads = new Leads(blankObject);
    }
    this.leadsForm = this.createContactForm();
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
      id: [this.leads.id],
      img: [this.leads.img],
      name: [this.leads.name],
      email: [this.leads.email],
      role: [this.leads.role],
      mobile: [this.leads.mobile],
      department: [this.leads.department],
      project: [this.leads.project],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.leadsService.addLeads(this.leadsForm.getRawValue());
  }
}
