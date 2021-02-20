import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {


  selected = 0;
  filters = {
    grams: {
      filter: ''
    },
    ingredients: {
      filter: ''
    },
    levelSpiceSweet: {
      filter: ''
    }
  }
  items = [
    {
      tabsTitle: 'Grams',
      tabsContent: [
        { tabItemTitle: '250 g', tabItemOption: ['0g', '250g', 'extra'] },
      ]
    },

    {
      tabsTitle: 'Ingredients',

      tabsContent: [
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] }
      ]
    },
    {
      tabsTitle: 'Cheese',
      tabsContent: [
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] }
      ]
    },
    {
      tabsTitle: 'Sauces',
      tabsContent: [
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] },
        { tabItemTitle: 'Market Tomato Sauce', tabItemOption: ['Regular', 'On the side', 'extra'] }
      ]
    },
  ];

  constructor(public dialogRef: MatDialogRef<CustomizeComponent>) { }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close()
  }

  onSelectionIndexChange(args) {
    this.selected = args;
  }

  onTopItem(item) {

  }

  onCustomOptionChange(args) {
    if (this.selected == 0) {
    this.filters.grams.filter = args;
    }else if (this.selected == 1) {
      this.filters.grams.filter = args;
      }else if (this.selected == 2) {
        this.filters.grams.filter = args;
        }
  }
}
