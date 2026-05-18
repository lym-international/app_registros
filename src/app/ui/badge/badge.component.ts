import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    imports: [BreadcrumbComponent, MatBadge, MatButton, MatIcon]
})
export class BadgeComponent {
  constructor() {
    // constructor
  }
}
