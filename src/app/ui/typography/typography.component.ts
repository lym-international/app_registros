import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss'],
    imports: [BreadcrumbComponent]
})
export class TypographyComponent {
  constructor() {
    // constructor
  }
}
