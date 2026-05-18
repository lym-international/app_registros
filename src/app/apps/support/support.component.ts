import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FeatherIconsComponent } from '../../shared/components/feather-icons/feather-icons.component';
export interface PeriodicElement {
  checked: boolean;
  imageUrl: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  assignTo: string;
  date: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    checked: false,
    imageUrl: 'assets/images/user/user1.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user2.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user3.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user4.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user5.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user6.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user7.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user8.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'pending',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user9.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user10.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user1.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user2.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user3.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'pending',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user4.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user5.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user6.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'pending',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user7.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user8.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
];
@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
    imports: [BreadcrumbComponent, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatCheckbox, FormsModule, MatIconButton, MatTooltip, FeatherIconsComponent, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class SupportComponent implements OnInit {
  displayedColumns: string[] = [
    'checked',
    'imageUrl',
    'name',
    'email',
    'subject',
    'status',
    'assignTo',
    'date',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor() {
    //constructor
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
