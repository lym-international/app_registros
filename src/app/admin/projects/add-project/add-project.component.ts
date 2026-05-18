import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Heading, Link, List, Image, Table } from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatRadioGroup, MatRadioButton, CKEditorModule, FileUploadComponent, MatButton]
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
