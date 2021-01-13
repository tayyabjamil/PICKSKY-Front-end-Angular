import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeOptionSelectComponent } from './customize-option-select/customize-option-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [CustomizeOptionSelectComponent],
  exports: [CustomizeOptionSelectComponent]
})
export class ThemeModule { }
