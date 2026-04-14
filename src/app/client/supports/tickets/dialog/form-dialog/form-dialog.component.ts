import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../tickets.service';
import { Tickets } from '../../tickets.model';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

export interface DialogData {
  id: number;
  action: string;
  ticket: Tickets;
}

@Component({
    selector: 'app-form-dialog:not(n)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatError, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatButton, MatDialogClose]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  ticketForm: UntypedFormGroup;
  ticket: Tickets;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ticketsService: TicketsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.ticket.ticket_id;
      this.ticket = data.ticket;
    } else {
      this.dialogTitle = 'New Ticket';
      const blankObject = {} as Tickets;
      this.ticket = new Tickets(blankObject);
    }
    this.ticketForm = this.createContactForm();
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
      id: [this.ticket.id],
      ticket_id: [this.ticket.ticket_id],
      createdBy: [this.ticket.createdBy],
      subject: [this.ticket.subject],
      status: [this.ticket.status],
      assignTo: [this.ticket.assignTo],
      date: [this.ticket.date],
      details: [this.ticket.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.ticketsService.addTicket(this.ticketForm.getRawValue());
  }
}
