import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CandidatesService } from '../../candidates.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Candidates } from '../../candidates.model';

export interface DialogData {
  id: number;
  action: string;
  candidates: Candidates;
}
@Component({
  selector: 'app-form-dialog:not(e)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  candidatesForm: UntypedFormGroup;
  candidates: Candidates;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public candidatesService: CandidatesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.candidates.name;
      this.candidates = data.candidates;
    } else {
      this.dialogTitle = 'New Candidates';
      const blankObject = {} as Candidates;
      this.candidates = new Candidates(blankObject);
    }
    this.candidatesForm = this.createContactForm();
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
      id: [this.candidates.id],
      img: [this.candidates.img],
      name: [this.candidates.name],
      title: [this.candidates.title],
      mobile: [this.candidates.mobile],
      download: [this.candidates.download],
      role: [this.candidates.role],
      email: [this.candidates.email],
      jobType: [this.candidates.jobType],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.candidatesService.addCandidates(this.candidatesForm.getRawValue());
  }
}
