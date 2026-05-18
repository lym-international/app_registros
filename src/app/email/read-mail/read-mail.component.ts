import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
@Component({
    selector: 'app-read-mail',
    templateUrl: './read-mail.component.html',
    styleUrls: ['./read-mail.component.scss'],
    imports: [BreadcrumbComponent]
})
export class ReadMailComponent {
  constructor() {
    // constructor
  }
}
