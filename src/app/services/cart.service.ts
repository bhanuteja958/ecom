import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:CartItem[] = [];
  count:number = 0;
  total:number = 0;

  constructor() { 
    window.addEventListener("unload",(event)=>{
      sessionStorage.setItem("cart",JSON.stringify(this.cart));
      sessionStorage.setItem("count",JSON.stringify(this.count));
      sessionStorage.setItem("total",JSON.stringify(this.total));
    })

    if(sessionStorage.getItem("cart") !== null){
      this.cart = JSON.parse(sessionStorage.getItem("cart"));
      this.count = JSON.parse(sessionStorage.getItem("count"));
      this.total = JSON.parse(sessionStorage.getItem("total"));
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("count");
    }
  }

  addToCart(cartItem:CartItem):boolean{

    if((this.cart.map(e => e.name).indexOf(cartItem.name))>= 0){
      return true;
    }
    else{
      this.cart.push(cartItem);
      this.total+=cartItem.count*cartItem.price;
      this.count+=cartItem.count;
      return false;
    }
    
  }

  removeFromCart(name:string):void{
    let cartItem:CartItem = this.cart[this.cart.map(e=>e.name).indexOf(name)];
    this.cart.splice(this.cart.map(e=>e.name).indexOf(name),1);
    this.total-=cartItem.count*cartItem.price;
    this.count -= cartItem.count;
    console.log(this.cart)
  }

  clearFromCart():void{
    this.cart = [];
    this.count = 0;
    this.total = 0;
  }
}
