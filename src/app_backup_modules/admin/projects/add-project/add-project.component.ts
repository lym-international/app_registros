import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List, Image, Table } from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss'],
    standalone: false
})
export class AddprojectsComponent {
  projectForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    plugins: [Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List, Image, Table],
    toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
  };
  teamList: string[] = [
    'Sarah Smith',
    'John Deo',
    'Pankaj Patel',
    'Pooja Sharma',
  ];
  constructor(private fb: UntypedFormBuilder) {
    this.projectForm = this.fb.group({
      projectID: ['', [Validators.required]],
      projectTitle: ['', [Validators.required]],
      department: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      client: ['', [Validators.required]],
      price: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      team: ['', [Validators.required]],
      status: ['', [Validators.required]],
      fileUpload: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.projectForm.value);
  }
}
