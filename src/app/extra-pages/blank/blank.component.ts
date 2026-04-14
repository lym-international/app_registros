import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss'],
    imports: [BreadcrumbComponent]
})
export class BlankComponent {
  constructor() {
    // constructor
  }
}
