import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { auth, firestore } from 'firebase';
import { drop } from '../animations/drop';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations:[
    drop
  ]
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean = true;
  showDropDown:boolean =false;
  showNavbar:boolean = false;
  angle:number = 0;
  user:any = {};

  constructor(
    private router:Router,
    private cartService:CartService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute) { 
    }

  ngOnInit() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn = true;
        this.showNavbar = true;
        this.userService.getUser().then((userData)=>{
          this.user = userData;
         
        })
      }
      else{
        this.loggedIn = false;
        this.showNavbar = true;
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
        this.userService.clearUser();
        this.router.navigate(['/']);
    })
  }

  onCartClick(){
    this.router.navigate(['/cart'])
  }

  onOutSideClick(){
    console.log("yay");
    this.showDropDown = false;
    this.angle = 0;
  }
}
