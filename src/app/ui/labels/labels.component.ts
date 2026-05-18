import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
@Component({
    selector: 'app-labels',
    templateUrl: './labels.component.html',
    styleUrls: ['./labels.component.scss'],
    imports: [BreadcrumbComponent]
})
export class LabelsComponent {
  constructor() {
    // constructor
  }
}
