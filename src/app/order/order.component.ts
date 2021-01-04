import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order:any = {};
  showGreeting:boolean = false;

  constructor(
    private cartService:CartService,
    private userService:UserService,
    private orderService:OrderService,
    private router:Router
  ) { 

  }

  ngOnInit() {
    this.orderService.getOrder().then((order)=>{
      this.order = order
    });
  }

  onPlaceOrder(){
    this.orderService.saveOrder().then(()=>{
      this.cartService.clearFromCart();
      this.showGreeting = true;
      setTimeout(()=>{
        this.router.navigate(['/'])
      },1500)
    }).catch((error)=>{
      console.log(error.message)
    })
  }

}
