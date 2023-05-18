import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MyProjectsService } from '../my-projects.service';
import { MyProjects } from '../my-projects.model';

export interface DialogData {
  id: number;
  action: string;
  myProjects: MyProjects;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  action?: string;
  dialogTitle?: string;
  isDetails = false;
  myProjects: MyProjects;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public myProjectsService: MyProjectsService
  ) {
    // Set the defaults
    this.myProjects = data.myProjects;
    this.isDetails = true;
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
