import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppsRoutingModule } from './apps-routing.module';
import { ChatComponent } from './chat/chat.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SupportComponent } from './support/support.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    ChatComponent,
    DragDropComponent,
    ContactGridComponent,
    SupportComponent,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    NgScrollbarModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class AppsModule {}
