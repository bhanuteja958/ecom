import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {auth,firestore} from 'firebase'
import { drop } from '../animations/drop';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations:[
    drop
  ]
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
  comments:any[] = [];
  showLoader:boolean = true;
  notLoggedIn:boolean = false;


  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private cartService:CartService,
    private router:Router
    ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProduct(this.productId).then((data)=>{
      this.product = data
      this.showLoader = false;
    }).then(()=>{
      this.productService.getProducts().then((products)=>{
        this.similarProducts = products.filter(product=> product.category === this.product.category);
      })
    }).catch((error)=>{
      this.showLoader = false;
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

  onOutSideClick():void{
    this.showQuantity = false;
    this.angle = 0;
  }

  onPostClick():void{
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.productService.addComment(this.productId,this.comment,this.product,user.uid).then((msg)=>{
          this.comment="";
          this.productService.getProduct(this.productId).then((data)=>{
            this.product = data
          })
        })
      }
      else{
        this.notLoggedIn = true;
        setTimeout(()=>{
          this.notLoggedIn = false
        },1500)
      }
    })
  
  }
}
