import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-contact-grid',
    templateUrl: './contact-grid.component.html',
    styleUrls: ['./contact-grid.component.scss'],
    imports: [BreadcrumbComponent, MatButton]
})
export class ContactGridComponent {
  constructor() {
    // constructor
  }
}
