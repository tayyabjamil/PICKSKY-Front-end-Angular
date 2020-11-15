import { AdminService } from './../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm : FormGroup
  name:String;
  price:number;
  detail:String;
  catagory:String;
  image;
  productCount : Number;
  constructor(public adminService:AdminService,public formBuilder:FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      catagory: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      productImage: new FormControl(''),
      productCount: new FormControl(1),

    })
  }
  selectProductImage(event) {
    const file = event.target.files[0];
    this.image = file;
    this.productForm.controls.productImage.setValue(this.image);
  }
  addProduct(){
    if(this.productForm.valid){

      const fd = new FormData();
      fd.append('name', this.productForm.value.name);
      fd.append('catagory', this.productForm.value.catagory);
      fd.append('price', this.productForm.value.price);
      fd.append('detail', this.productForm.value.detail);
      fd.append('productCount', this.productForm.value.productCount);

      if (this.productForm.value.productImage) {
        fd.append('productImage', this.productForm.value.productImage);
      }



      this.adminService.addProducts(fd).subscribe((data: any) => {
      alert("Product Added")

      }, (error) => {
        alert("No Product Added");
      });
    }
      else{
        alert("Please Fill All the entries of the Form")
      }
    }
}
