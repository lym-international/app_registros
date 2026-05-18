import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatList, MatListItem, MatSelectionList, MatListOption } from '@angular/material/list';
@Component({
    selector: 'app-list-group',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss'],
    imports: [BreadcrumbComponent, MatList, MatListItem, MatSelectionList, MatListOption]
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
