import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {

  addresses:any = [];

  constructor(
      private userService:UserService,
      private orderService:OrderService,
      private router:Router
    ) { }

  ngOnInit() {
    this.userService.getUserFromDatabase = true;
    this.userService.getUser().then((user)=>{
      this.addresses = user.addresses;
    })
  }

  onAddAddressClick(){
    this.router.navigate(['/addresses'])
  }

  selectAddress(index:number):void{
    this.orderService.setDeliveryAddress(this.addresses[index]);
    this.router.navigate(['/order']);
  }

}
