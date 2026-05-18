import { Component } from '@angular/core';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List } from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.scss'],
    standalone: false
})
export class ComposeComponent {
  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    plugins: [Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List],
    toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
  };
  constructor() {}
}