import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ShortlistService } from '../../shortlist.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Shortlist } from '../../shortlist.model';

export interface DialogData {
  id: number;
  action: string;
  shortlist: Shortlist;
}

@Component({
  selector: 'app-form-dialog:not(h)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  shortlistForm: UntypedFormGroup;
  shortlist: Shortlist;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public shortlistService: ShortlistService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.shortlist.name;
      this.shortlist = data.shortlist;
    } else {
      this.dialogTitle = 'New Shortlist';
      const blankObject = {} as Shortlist;
      this.shortlist = new Shortlist(blankObject);
    }
    this.shortlistForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.mobile,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('mobile')
      ? 'Not a valid mobile'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.shortlist.id],
      img: [this.shortlist.img],
      name: [this.shortlist.name],
      title: [this.shortlist.title],
      mobile: [this.shortlist.mobile],
      download: [this.shortlist.download],
      role: [this.shortlist.role],
      email: [this.shortlist.email],
      jobType: [this.shortlist.jobType],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.shortlistService.addShortlist(this.shortlistForm.getRawValue());
  }
}
