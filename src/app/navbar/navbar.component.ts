import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth, firestore } from 'firebase';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean = true;
  showDropDown:boolean =false;
  angle:number = 0;
  user:any = {};

  constructor(private router:Router,private cartService:CartService) { }

  ngOnInit() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn = true;
        console.log(user)
        firestore().collection("users").where("email","==",user.email).get().then((doc)=>{
          console.log(doc);
        })
      }
      else{
        this.loggedIn = false
      }
    })
  }

  onSignUpClick(){
    this.router.navigate(['/signup']);
  }

  onLoginClick(){ 
    this.router.navigate(['/login'])
  }

  onAccountClick(){
    this.showDropDown = !this.showDropDown;
    if(this.showDropDown == true){ 
      this.angle = -180;
    }
    else{
      this.angle = 0;
    }
  }

  logout(){
    auth().signOut().then(()=>{
      this.router.navigate(['/'])
    })
  }

  onCartClick(){
    this.router.navigate(['/cart'])
  }
}
