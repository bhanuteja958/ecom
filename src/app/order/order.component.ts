import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  user:any = {}

  constructor(private cartService:CartService,
    private userService:UserService) { 

  }

  ngOnInit() {
    this.userService.getUser().then((user)=>{
        this.user = user
    })
  }

}
