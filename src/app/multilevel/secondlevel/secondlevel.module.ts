import { Second1Component } from './second1/second1.component';
import { Second2Component } from './second2/second2.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondLevelRoutingModule } from './secondlevel-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SecondLevelRoutingModule,
        ComponentsModule,
        Second1Component, Second2Component,
    ],
})
export class SecondLevelModule {}
