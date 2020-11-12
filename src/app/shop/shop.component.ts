import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  decks:any[] = [];
  category:string = 'all'
  displayDecks:any[] = [];

  constructor(private router:Router,private productService:ProductService) { }

  ngOnInit() {
    this.productService.getProducts().then((products)=>{
      this.decks = products;
      this.displayDecks = products;
      console.log(this.displayDecks);
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
