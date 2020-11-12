import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice:number = 0;
  taxes:number = 0

  constructor(
    private cartService:CartService,
  ) { }

  ngOnInit() {
    this.computePrice();
  }

  computePrice():void{
    this.totalPrice = Math.floor(this.cartService.total*1.1+500);
    this.taxes = Math.floor(this.cartService.total*0.1);
  }

  onDeleteClick(name:string):void{
    this.cartService.removeFromCart(name);
    this.computePrice();
  }
}
