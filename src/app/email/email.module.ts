import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRoutingModule } from './email-routing.module';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ComposeComponent, InboxComponent, ReadMailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    MatCheckboxModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class EmailModule {}
