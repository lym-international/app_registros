import { Component } from '@angular/core';
import { Color, ScaleType, PieChartModule } from '@swimlane/ngx-charts';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FeatherIconsComponent } from '../../../shared/components/feather-icons/feather-icons.component';
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    imports: [BreadcrumbComponent, MatTabGroup, MatTab, MatTabLabel, MatIcon, MatIconButton, MatTooltip, FeatherIconsComponent, PieChartModule]
})
export class EmployeeComponent {
  gradient = false;
  showLegend = true;
  legendPosition = 'right';
  view: number[] = [500, 400];
  colorScheme: Color = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };
  showLabels = true;
  // data goes here
  public single = [
    {
      name: 'Present',
      value: 42,
    },
    {
      name: 'On Duty',
      value: 2,
    },
    {
      name: 'Paid Leave',
      value: 5,
    },
    {
      name: 'Absent',
      value: 1,
    },
    {
      name: 'Holiday Leave',
      value: 3,
    },
    {
      name: 'Weekend',
      value: 0,
    },
  ];
}
