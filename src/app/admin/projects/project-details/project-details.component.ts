import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    imports: [BreadcrumbComponent, MatProgressBar, MatTabGroup, MatTab, MatTabLabel, MatIcon]
})
export class ProjectDetailsComponent {
  constructor() {
    // constructor
  }
}
