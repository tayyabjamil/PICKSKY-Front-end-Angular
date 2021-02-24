import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customize-option-select',
  templateUrl: './customize-option-select.component.html',
  styleUrls: ['./customize-option-select.component.scss']
})
export class CustomizeOptionSelectComponent implements OnInit {

  @Input() options = [];
  @Input() myFormGroup: FormGroup;
  @Input() myFormControl;
  @Input() minimumValue;
  @Output() customOptionChange = new EventEmitter<any>();
  currentOptionIndex = 0;
  minimumValueIndex;

  constructor() { }

  ngOnInit() {
    let formValue = this.myFormGroup.controls[this.myFormControl].value;
    let existedItemIndex= null;
    this.options.forEach((option, index) => {
      if (option === formValue) {
        existedItemIndex = index;
      }
    });

    if (existedItemIndex != null) {
      this.currentOptionIndex = existedItemIndex;
    } else {
      this.options.push(formValue);
      this.currentOptionIndex = this.options.length - 1;
    }

    if (this.minimumValue) {
      this.options.forEach((item, index) => {
        if (item == this.minimumValue) {
          this.minimumValueIndex = index;
        }
      })
    }
  }

  nextOption() {
    if (this.currentOptionIndex < (this.options.length - 1)) {
      this.currentOptionIndex++;
      this.myFormGroup.controls[this.myFormControl].setValue(this.options[this.currentOptionIndex])
    }
  }

  perviousOption() {
    if (this.minimumValueIndex) {
      if (this.currentOptionIndex > 0 && (this.minimumValueIndex < this.currentOptionIndex)) {
        this.currentOptionIndex--;
        this.myFormGroup.controls[this.myFormControl].setValue(this.options[this.currentOptionIndex])
      }
    } else {
      if (this.currentOptionIndex > 0) {
        this.currentOptionIndex--;
        this.myFormGroup.controls[this.myFormControl].setValue(this.options[this.currentOptionIndex])
      }
    }
  }

  get getCurrentOption() {
    this.customOptionChange.emit(this.options[this.currentOptionIndex]);

    return this.options[this.currentOptionIndex];
  }
}
