import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
    selector: 'app-preloaders',
    templateUrl: './preloaders.component.html',
    styleUrls: ['./preloaders.component.scss'],
    imports: [BreadcrumbComponent, MatProgressSpinner]
})
export class PreloadersComponent {
  constructor() {
    // constructor
  }
}
