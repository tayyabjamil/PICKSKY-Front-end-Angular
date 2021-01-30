import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  items = [
    {
      tabsTitle: 'Grams',

      tabsContent: [
        { tabItemTitle: '250 g', tabItemOption: ['', '', ''] },
        { tabItemTitle: '500g', tabItemOption: ['', '', ''] },
        { tabItemTitle: '750g', tabItemOption: ['', '', ''] },
        { tabItemTitle: '100g', tabItemOption: ['', '', ''] }
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

  onTopItem(item) {

  }
}
