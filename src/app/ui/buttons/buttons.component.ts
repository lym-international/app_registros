import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatButton, MatIconButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
    imports: [BreadcrumbComponent, MatButton, RouterLink, MatIconButton, MatIcon, MatFabButton, MatMiniFabButton]
})
export class ButtonsComponent {
  constructor() {
    // constructor
  }
}
