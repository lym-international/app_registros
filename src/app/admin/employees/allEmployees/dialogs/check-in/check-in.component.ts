import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { CheckInModel } from './check-in.model';

import { formatDate } from '@angular/common';
import { Timestamp } from 'firebase/firestore';

export interface DialogData {
  id: number;
  action: string;
}

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  action: string;
  dialogTitle: string;
  checkInForm: UntypedFormGroup;
  checkIn: CheckInModel;
  showDeleteBtn = false;

  ngOnInit(): void {
    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckIn date:';
      const blankObject = {} as CheckInModel;
      this.checkIn = new CheckInModel(blankObject);
      this.showDeleteBtn = false;
    }
    this.checkInForm = this.createContactForm();
    console.log('Hora CheckIn ==>', this.checkInForm.controls);
  }

  // ... (Other methods in the component)

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.checkIn.id],
      title: [this.checkIn.title],
      category: [this.checkIn.category],
      startDate: [this.checkIn.startDate, [Validators.required]],
      endDate: [this.checkIn.endDate],
      details: [this.checkIn.details],
    });
  }

  submit() {
    // This method is not implemented yet, you can add the desired functionality here.
  }

  deleteEvent() {
    // This method is not implemented yet, you can add the desired functionality here.
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const selectedDate = this.checkInForm.get('startDate').value;

  // Crear un objeto Timestamp desde la cadena de fecha directamente
  const timestamp = Timestamp.fromDate(new Date(selectedDate));

  const date = timestamp.toDate();

  // Obtener la fecha formateada en la zona horaria local de Estados Unidos
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  console.log('timestamp', timestamp);
  console.log('date', date);
  console.log('Formatted Date:', formattedDate);
  
    // You can add further logic or save the date in your desired way.
    this.dialogRef.close('submit');
  }
}
