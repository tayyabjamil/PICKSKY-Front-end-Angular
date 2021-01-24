import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from '../home/cart.service';
import { ProductService } from '../home/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkOut',
  templateUrl: './checkOut.component.html',
  styleUrls: ['./checkOut.component.css']
})
export class CheckOutComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,
    public cartService:CartService,
     public productService:ProductService,
     public authService:AuthService) { }
cartItems
total;
title = 'newMat';

isLinear = true;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;


  ngOnInit() {

    // this.getCartItems()
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      amount: ['', Validators.required],
      stock: ['', Validators.required]
    });

  }

  getCartItems(){
    this.cartItems = this.cartService.getProducts()
    console.log(this.cartItems)
   }
   getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }
   get getTotal() {
     this.total =  this.cartService.getTotalPrice();
    return this.total
   }
submit(){

}
}
