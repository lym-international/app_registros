import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-second2',
    templateUrl: './second2.component.html',
    styleUrls: ['./second2.component.scss'],
    imports: [BreadcrumbComponent]
})
export class Second2Component {
  constructor() {
    // constructor
  }
}
