import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contacts } from '../contacts.model';
import { formatDate, DatePipe } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatCardContent } from '@angular/material/card';

export interface DialogData {
  id: number;
  action: string;
  contacts: Contacts;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatError, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatButton, MatDialogClose, MatCardContent, DatePipe]
})
export class FormComponent {
  action: string;
  dialogTitle?: string;
  isDetails = false;
  contactsForm?: UntypedFormGroup;
  contacts: Contacts;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public contactsService: ContactsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.contacts.name;
      this.contacts = data.contacts;
      this.contactsForm = this.createContactForm();
    } else if (this.action === 'details') {
      this.contacts = data.contacts;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Contacts';
      const blankObject = {} as Contacts;
      this.contacts = new Contacts(blankObject);
      this.contactsForm = this.createContactForm();
    }
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
      id: [this.contacts.id],
      img: [this.contacts.img],
      name: [this.contacts.name],
      email: [
        this.contacts.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      birthDate: [
        formatDate(this.contacts.birthDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      address: [this.contacts.address],
      mobile: [this.contacts.mobile],
      note: [this.contacts.note],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.contactsService.addContacts(this.contactsForm?.getRawValue());
  }
}
