import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeOptionSelectComponent } from './customize-option-select/customize-option-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [CustomizeOptionSelectComponent, FooterComponent],
  exports: [CustomizeOptionSelectComponent, FooterComponent]
})
export class ThemeModule { }
