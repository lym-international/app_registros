import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-first2',
    templateUrl: './first2.component.html',
    styleUrls: ['./first2.component.scss'],
    imports: [BreadcrumbComponent]
})
export class First2Component {
  constructor() {
    // constructor
  }
}
