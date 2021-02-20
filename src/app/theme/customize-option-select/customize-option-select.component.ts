import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customize-option-select',
  templateUrl: './customize-option-select.component.html',
  styleUrls: ['./customize-option-select.component.scss']
})
export class CustomizeOptionSelectComponent implements OnInit {

  @Input() options = [];
  @Output() customOptionChange = new EventEmitter<any>();
  currentOptionIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  nextOption() {
    if (this.currentOptionIndex < (this.options.length -1) ) {
      this.currentOptionIndex++;
    }
  }

  perviousOption() {
    if (this.currentOptionIndex > 0 ) {
      this.currentOptionIndex--;
    }
  }

  get getCurrentOption() {
    this.customOptionChange.emit(this.options[this.currentOptionIndex])
    return this.options[this.currentOptionIndex];
  }
}
