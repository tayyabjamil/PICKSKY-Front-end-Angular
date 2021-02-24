import { AdminService } from './../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup
  name: String;
  price: number;
  detail: String;
  catagory: String;
  ingredients;
  image;
  data;
  multipleImages
  productOrders = '1';
  constructor(public route: ActivatedRoute,
    public adminService: AdminService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    const object = this.route.snapshot.paramMap.get('id');
    this.data = JSON.parse(object);
    if (this.data) {
      this.productForm = this.formBuilder.group({
        _id: new FormControl(this.data._id),

        name: new FormControl(this.data.name),
        catagory: new FormControl(this.data.catagory),
        price: new FormControl(this.data.price),
        detail: new FormControl(this.data.detail),
        productImage: new FormControl(this.data.productImage),

      })
    } else {
      this.productForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        catagory: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        detail: new FormControl('', [Validators.required]),
        productImage: new FormControl('',[Validators.required]),
        multipleImages: new FormControl(''),
        grams:new FormControl('',Validators.required),

        ingredients:new FormControl('',Validators.required),
        sweet_spice:new FormControl('',Validators.required)
      })
    }
  }
  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      this.productForm.controls.multipleImages.setValue(this.multipleImages);
    }
  }
  selectProductImage(event) {
    const file = event.target.files[0];
    this.image = file;
    this.productForm.controls.productImage.setValue(this.image);
  }
  addProduct() {
    if (this.productForm.valid) {

      const fd = new FormData();
      fd.append('name', this.productForm.value.name);
      fd.append('catagory', this.productForm.value.catagory);
      fd.append('price', this.productForm.value.price);
      fd.append('detail', this.productForm.value.detail);
      fd.append('grams', this.productForm.value.grams);
      fd.append('ingredients', this.productForm.value.ingredients);
      fd.append('sweet_spice', this.productForm.value.sweet_spice);

      if (this.productForm.value.productImage) {
        fd.append('productImage', this.productForm.value.productImage);
      }
      if (this.productForm.value.multipleImages) {
        for (const image of this.productForm.value.multipleImages) {
          fd.append('multipleImages', image);
        }
      }

      this.adminService.addProducts(fd).subscribe((data: any) => {
        alert("Product Added")

      }, (error) => {
        alert("No Product Added");
      });
    }
    else {
      alert("Please Fill All the entries of the Form")
    }
  }
  edit() {
    const fd = new FormData();
    fd.append('_id', this.productForm.value._id);
    fd.append('name', this.productForm.value.name);
    fd.append('catagory', this.productForm.value.catagory);
    fd.append('price', this.productForm.value.price);
    fd.append('detail', this.productForm.value.detail);
    fd.append('productOrders', this.productOrders);

    if (this.productForm.value.productImage) {
      fd.append('productImage', this.productForm.value.productImage);
    }

    this.adminService.edit(fd).subscribe((campaignData) => {

      alert('Edited');
    }, (error) => {
      alert('failed');
    });
  }

}
