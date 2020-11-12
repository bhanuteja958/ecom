import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase'
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  showQuantity:boolean = false;
  productQuantity:number=0;
  product:any = {};
  productId:string;
  value:number = 0;
  count:number = 0;
  similarProducts:any[] =[];
  angle:number = 0;
  comment:string="";
  displayProduct:boolean = false;


  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private cartService:CartService,
    private router:Router
    ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.product = firebase.firestore().collection('cards').doc(this.productId).get().then((doc)=>{
        this.product = doc.data();
        this.displayProduct = true;
    }).then(()=>{
      this.productService.getProducts().then((products)=>{
        this.similarProducts = products.filter(product=> product.category === this.product.category);
        console.log(this.similarProducts)
      })
    })

  }

 

  onQuantityClick():void{
    this.showQuantity = ! this.showQuantity;
    if(this.showQuantity===true){ 
      this.angle = -180;
    }
    else{
      this.angle = 0;
    }
  }

  onLeftCarouselControlClick():void{
    this.value += 400;
    this.count--;
  }
  onRightCarouselControlClick():void{
    this.value += -400;
    this.count++;
  }

  displayLeftControl():boolean{
    if(this.count > 0){
      return true;
    }
    else{
      return false;
    }
  }

  displayRightControl():boolean{
    if(this.count < this.product.carouselImg.length-1){
      return true;
    }
    else{
      return false;
    }
  }

  onAddToCartClick():void{
    this.cartService.addToCart({
      id:this.productId,
      name:this.product.name,
      count:this.productQuantity,
      price:this.product.price
    });

    this.router.navigate(['/cart']);
  }

  onQuantityNumberClick(quantity:number):void{
    this.productQuantity = quantity;
    this.showQuantity = false;
    this.angle = 0;
  }
}
