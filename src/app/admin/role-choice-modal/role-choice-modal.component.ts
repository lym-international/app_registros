// import { Component, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-role-choice-modal',
//   templateUrl: './role-choice-modal.component.html',
//   styleUrls: ['./role-choice-modal.component.scss']
// })
// export class RoleChoiceModalComponent {
//   @Output() roleChosen = new EventEmitter<string>();

//   chooseRole(role: string) {
//     this.roleChosen.emit(role);
//   }
// }

import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role-choice-modal',
  templateUrl: './role-choice-modal.component.html',
  styleUrls: ['./role-choice-modal.component.scss']
})
export class RoleChoiceModalComponent implements OnInit {
  @Output() roleChosen = new EventEmitter<string>();
  currentRole = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { role: string }) {}

  ngOnInit() {
    this.currentRole = this.data.role;
  }

  chooseRole(role: string) {
    this.roleChosen.emit(role);
  }
}