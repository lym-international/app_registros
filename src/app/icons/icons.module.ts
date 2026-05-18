import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconsRoutingModule } from "./icons-routing.module";
import { MaterialComponent } from "./material/material.component";
import { FontAwesomeComponent } from "./font-awesome/font-awesome.component";
import { ComponentsModule } from "../shared/components/components.module";
@NgModule({
    imports: [CommonModule, IconsRoutingModule, ComponentsModule, MaterialComponent, FontAwesomeComponent],
})
export class IconsModule {}
