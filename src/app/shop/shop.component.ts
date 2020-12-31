import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { slideFromLeft, slideFromRight } from '../animations/slide';
import {ProductService} from '../services/product.service'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations:[
    slideFromLeft,
    slideFromRight
  ]
})
export class ShopComponent implements OnInit {

  decks:any[] = [];
  category:string = 'all'
  displayDecks:any[] = [];
  showLoader:boolean = true;
  loggedIn:boolean = true;
  user:any = {}

  constructor(
    private router:Router,
    private productService:ProductService,
    private userService:UserService) { }

  ngOnInit() {
    this.productService.getProducts().then((products)=>{
      this.decks = products;
      this.displayDecks = products;
      console.log(this.displayDecks);
    })
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn = true;
        this.showLoader = false;
      }
      else{
        this.loggedIn = false;
        this.showLoader =false;
      }
    })
  }

  onCategoryClick(value){
    this.category = value;
    if(this.category !== 'all'){
      this.displayDecks = this.decks.filter((doc)=> doc.category ===this.category);
    }
    else{
      this.displayDecks = this.decks;
    }
  }

  onProductClick(deck){
    this.router.navigate([`/product/${deck.id}`])
  }

}
