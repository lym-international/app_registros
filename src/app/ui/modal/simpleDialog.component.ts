import { Component } from "@angular/core";
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatButton } from "@angular/material/button";
@Component({
    template: `
    <h1 mat-dialog-title>Hello There</h1>
    <div mat-dialog-content>
      <p>This Is a Simple Dialog</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton]
})
export class SimpleDialogComponent {
  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>) {}
  close(): void {
    this.dialogRef.close();
  }
}
