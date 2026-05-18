import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
    imports: [BreadcrumbComponent]
})
export class MaterialComponent {
  constructor() {
    // constructor
  }
}
