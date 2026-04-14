import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ViewportAdapter, NgScrollbar } from 'ngx-scrollbar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [BreadcrumbComponent, ViewportAdapter, NgScrollbar, MatFormField, MatInput, MatMiniFabButton]
})
export class ChatComponent {
  hideRequiredControl = new UntypedFormControl(false);
  constructor() {
    // constructor
  }
}
