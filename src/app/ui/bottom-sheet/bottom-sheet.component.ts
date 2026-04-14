import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatButton } from '@angular/material/button';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatLine } from '@angular/material/grid-list';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss'],
    imports: [BreadcrumbComponent, MatButton]
})
export class BottomSheetComponent {
  breadscrums = [
    {
      title: 'Bottom Sheet',
      items: ['UI'],
      active: 'Bottom Sheet',
    },
  ];
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }
}
@Component({
    selector: 'app-bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
    imports: [MatNavList, MatListItem, MatLine]
})
export class BottomSheetOverviewExampleSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
