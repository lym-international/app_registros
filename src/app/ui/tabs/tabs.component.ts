import { Component } from "@angular/core";
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { MatTabGroup, MatTab, MatTabLabel } from "@angular/material/tabs";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    imports: [BreadcrumbComponent, MatTabGroup, MatTab, MatTabLabel, MatIcon, MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatButton, MatCheckbox]
})
export class TabsComponent {
  tabs = ["First", "Second", "Third"];
  selected = new UntypedFormControl(0);
  addTab(selectAfterAdding: boolean) {
    this.tabs.push("New");
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
