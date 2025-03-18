import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-role-choice-modal',
  templateUrl: './role-choice-modal.component.html',
  styleUrls: ['./role-choice-modal.component.scss']
})
export class RoleChoiceModalComponent {
  @Output() roleChosen = new EventEmitter<string>();

  chooseRole(role: string) {
    this.roleChosen.emit(role);
  }
}