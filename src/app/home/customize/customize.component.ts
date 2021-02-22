import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {
  customInstructions=''
  customGrams=0
  selected = 0;
  filters = {
    grams: {
      filter: ''
    },
    ingredients: {
      filter: ''
    },
    SpiceLevel: {
      filter: ''
    },
    SweetLevel: {
      filter: ''
    },CustomizeText: {
      filter: ''
    },
  }
  items = [
    {
      tabsTitle: 'Grams',
      tabsContent: [
        { tabItemTitle: '250 g', tabItemOption: ['0g', '250g','500g', '750g','1000g',] },
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
      tabsTitle: 'Spice Level',
      tabsContent: [
        { tabItemTitle: 'Select Spice Level', tabItemOption: ['less spice', 'normal spice', 'extra spice'] },


      ]
    },
    {
      tabsTitle: 'Sweet Level',
      tabsContent: [
        { tabItemTitle: 'Select Sweet Level', tabItemOption: ['less sweet', 'normal sweet', 'extra sweet'] },

      ]
    },
    {
      tabsTitle: 'Custom Requirnments',
      tabsContent: [
        { tabItemTitle: 'Custom Requirnments'},

      ]
    },
  ];

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService,public dialogRef: MatDialogRef<CustomizeComponent>) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  aboutUSProducts;

  ngOnInit() {
    console.log(this.data)
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })


  }


  onClose() {
    this.data.item.customization = this.filters
    this.dialogRef.close()
  }

  onSelectionIndexChange(args) {
    this.selected = args;
  }

  onTopItem(item) {
console.log(item)
  }

  onCustomOptionChange(args) {
    if (this.selected == 0) {
    this.filters.grams.filter = args;
    }else if (this.selected == 1) {
      this.filters.ingredients.filter = args;
      }else if (this.selected == 2) {
        this.filters.SpiceLevel.filter = args;
        }else if (this.selected == 2) {
          this.filters.SweetLevel.filter = args;
          }else if (this.selected == 2) {
            this.filters.CustomizeText = args;
            }
  }
}
