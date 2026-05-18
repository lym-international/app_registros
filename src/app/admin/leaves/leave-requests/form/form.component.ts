import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LeavesService } from '../leaves.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Leaves } from '../leaves.model';
import { formatDate, DatePipe } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatCardContent } from '@angular/material/card';

export interface DialogData {
  id: number;
  action: string;
  leaves: Leaves;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatError, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatSelect, MatOption, MatButton, MatDialogClose, MatCardContent, DatePipe]
})
export class FormComponent {
  action: string;
  dialogTitle?: string;
  isDetails = false;
  leavesForm!: UntypedFormGroup;
  leaves: Leaves;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leavesService: LeavesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.leaves.name;
      this.leaves = data.leaves;
      this.leavesForm = this.createContactForm();
    } else if (this.action === 'details') {
      this.leaves = data.leaves;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Leaves';
      const blankObject = {} as Leaves;
      this.leaves = new Leaves(blankObject);
      this.leavesForm = this.createContactForm();
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.type,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('type')
      ? 'Not a valid type'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.leaves.id],
      img: [this.leaves.img],
      name: [this.leaves.name],
      type: [this.leaves.type, [Validators.required, Validators.minLength(5)]],
      from: [
        formatDate(this.leaves.from, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      leaveTo: [
        formatDate(this.leaves.leaveTo, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      reason: [this.leaves.reason],
      noOfDays: [this.leaves.noOfDays],
      status: [this.leaves.status],
      note: [this.leaves.note],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.leavesService.addLeaves(this.leavesForm?.getRawValue());
  }
}
