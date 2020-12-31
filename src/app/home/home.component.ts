import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { slideFromLeft ,slideFromRight} from '../animations/slide';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    slideFromLeft,
    slideFromRight
  ]
})
export class HomeComponent implements OnInit {
  loggedIn:boolean = false;
  showLoader:boolean = true;
  user:any = {};
 

  constructor(
    private router:Router,
    private userService:UserService) { }

  ngOnInit() {
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

  onVisitShopClick():void{
    this.router.navigate(['/shop']);
  }

}
