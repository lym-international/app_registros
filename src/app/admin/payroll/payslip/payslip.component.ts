import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-payslip',
    templateUrl: './payslip.component.html',
    styleUrls: ['./payslip.component.scss'],
    imports: [BreadcrumbComponent]
})
export class PayslipComponent {
  constructor() {
    //constructor
  }
}
