import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  customInstructions = ''
  customGrams = 0
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
    },
    CustomizeText: {
      filter: ''
    },
  }

  gramsFormGroup: FormGroup;
  ingredientsFormGroup: FormGroup;

  items: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService,
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<CustomizeComponent>) {

    dialogRef.disableClose = true;
  }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  aboutUSProducts;
  customFormGroup: FormGroup;
  spiceLevelFormGroup: FormGroup;
  sweetFormGroup: FormGroup;
  customRequirments: FormGroup;
  formData;
  currentGrams;
  defaultGrams;
  defaultGramPrice;
  gramsPrice;
custom;
  ngOnInit() {
    console.log(this.data)
    this.defaultGrams = this.currentGrams = Math.round(parseInt(this.data.item.grams));
    this.defaultGramPrice = this.data.item.price;
    this.gramsPrice = this.data.item.price;
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    });

    this.gramsFormGroup = this.formBuilder.group({
      grams: [this.data.item.grams, []]
    })
    this.spiceLevelFormGroup = this.formBuilder.group({
      spice: ['normal spice', []]
    })

    this.sweetFormGroup = this.formBuilder.group({
      sweet: ['normal sweet', []]
    })
    this.customFormGroup = this.formBuilder.group({
      custom: ['', []]
    })

    this.ingredientsFormGroup = this.formBuilder.group({})

    if (this.data && this.data.item && this.data.item.ingredients) {
      let ingredientControls = this.data.item.ingredients.toString().split(',');
      ingredientControls.forEach(ingredient => {
        ingredient = ingredient.replace(/^[\s\d]+/, '');
        this.ingredientsFormGroup.addControl(ingredient, new FormControl('Regular'));
      });
    }

    this.gramsFormGroup.valueChanges.subscribe((value) => {
      if (value.grams) {
        let newGramValue = parseInt(value.grams);
        let getOneGramPrice = this.defaultGramPrice / this.defaultGrams;
        this.gramsPrice = Math.round(newGramValue * getOneGramPrice);
      }
    })

    this.items = [
      {
        tabsTitle: 'Grams',
        tabsContent: [
          { formGroup: this.gramsFormGroup, tabContentItemformControlName: 'Total Grams', tabItemTitle: 'Total grams', minimumValue: this.data.item.grams, tabItemOption: ['0g', '100g', '200g', '250g', '500g', '750g', '1000g', '2000g', '3000g', '4000g', '5000g',] },
        ],
      },
      {
        tabsTitle: 'Ingredients',

        tabsContent: [
        ]
      },
      {
        tabsTitle: 'Custom',

       },
       {
        tabsTitle: 'Done',

       }

    ];


    if (this.data.item.sweet_spice == "Spice") {
      this.items.push({
        tabsTitle: 'Spice Level',
        tabsContent: [
          { formGroup: this.spiceLevelFormGroup, tabContentItemformControlName: 'spice', tabItemTitle: 'Select Spice Level', tabItemOption: ['less spice', 'normal spice', 'extra spice'] },
        ]
      })
    } else {
      this.items.push(
        {
          tabsTitle: 'Sweet Level',
          tabsContent: [
            { formGroup: this.sweetFormGroup, tabContentItemformControlName: 'sweet', tabItemTitle: 'Select Sweet Level', tabItemOption: ['less sweet', 'normal sweet', 'extra sweet'] },
          ]
        }
      )
    }

    Object.keys(this.ingredientsFormGroup.controls).forEach(key => {
      this.items[1].tabsContent.push(
        { formGroup: this.ingredientsFormGroup, tabContentItemformControlName: key, tabItemTitle: key, tabItemOption: ['Regular', 'On the side', 'extra'] },
      )
    });
  }



  onSave() {
    this.formData = [];
    this.formData.push(...Object.entries(this.gramsFormGroup.value));
    this.formData.push(...Object.entries(this.ingredientsFormGroup.value));
    if (this.data.item.sweet_spice == "Sweet") {
    this.formData.push(...Object.entries(this.sweetFormGroup.value));
    }
    if (this.data.item.sweet_spice == "Spice") {

    this.formData.push(...Object.entries(this.spiceLevelFormGroup.value));
    }
    this.formData.push(...Object.entries(this.customFormGroup.value))
  }
onClose(){
  this.dialogRef.close(this.formData);

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
    } else if (this.selected == 1) {
      this.filters.ingredients.filter = args;
    } else if (this.selected == 2) {
      this.filters.SpiceLevel.filter = args;
    } else if (this.selected == 2) {
      this.filters.SweetLevel.filter = args;
    } else if (this.selected == 2) {
      this.filters.CustomizeText = args;
    }
  }
}
