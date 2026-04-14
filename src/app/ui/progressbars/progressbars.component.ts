import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatProgressBar } from '@angular/material/progress-bar';
@Component({
    selector: 'app-progressbars',
    templateUrl: './progressbars.component.html',
    styleUrls: ['./progressbars.component.scss'],
    imports: [BreadcrumbComponent, MatProgressBar]
})
export class ProgressbarsComponent {
  constructor() {
    // constructor
  }
}
