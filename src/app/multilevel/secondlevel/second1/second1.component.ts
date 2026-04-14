import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-second1',
    templateUrl: './second1.component.html',
    styleUrls: ['./second1.component.scss'],
    imports: [BreadcrumbComponent]
})
export class Second1Component {
  constructor() {
    // constructor
  }
}
