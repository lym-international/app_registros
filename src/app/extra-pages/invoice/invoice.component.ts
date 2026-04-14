import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
    imports: [BreadcrumbComponent, MatButton]
})
export class InvoiceComponent {
  constructor() {
    // constructor
  }
}
