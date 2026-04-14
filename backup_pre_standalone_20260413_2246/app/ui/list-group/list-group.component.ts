import { Component } from '@angular/core';
@Component({
    selector: 'app-list-group',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss'],
    standalone: false
})
export class ListGroupComponent {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  constructor() {
    // constructor
  }
}
