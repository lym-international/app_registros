import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
@Component({
    selector: 'app-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss'],
    imports: [BreadcrumbComponent, MatTabGroup, MatTab, MatTabLabel, MatIcon, MatFormField, MatLabel, MatInput, MatButton, MatCheckbox]
})
export class EmployeeProfileComponent {
  constructor() {
    // constructor
  }
}
