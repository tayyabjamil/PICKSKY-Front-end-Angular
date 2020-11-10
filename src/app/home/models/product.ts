export class Product {
  productId:number;
  productCount : number;
  image: string;
  price: number;
  details: String;
  unitTotal:number

constructor(productId:number,unitTotal:number,productCount:number,image: string, price: number, details : string) {
  this.productId = productId;
  this.unitTotal = unitTotal;
  this.productCount = productCount;
  this.image = image;
  this.price = price;
  this.details = details;
}
}
