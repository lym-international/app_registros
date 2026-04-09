import { LOCALE_ID, NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MAT_MODULES = [
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatStepperModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
  MatTreeModule, MatNativeDateModule,
];

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    DatetimePickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherIconsModule,
    ...MAT_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherIconsModule,
    ...MAT_MODULES,
    FileUploadComponent,
    BreadcrumbComponent,
    DatetimePickerComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
})
export class ComponentsModule {}