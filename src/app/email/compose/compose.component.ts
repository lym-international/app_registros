import { Component } from '@angular/core';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List } from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, MatFormField, MatLabel, MatInput, CKEditorModule, MatButton]
})
export class ComposeComponent {
  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    plugins: [Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List],
    toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
  };
  constructor() {}
}