import { Component, OnInit } from '@angular/core';
import {auth} from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  errorMsg:string ='';
  showError:boolean = false;
  showLoader:boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  onLoginSubmit(loginForm){
    this.showLoader = true;
    let email = loginForm.controls.email.value;
    let password = loginForm.controls.password.value;
    auth().signInWithEmailAndPassword(email,password).then(()=>{
      this.showLoader = false;
      this.router.navigate(['/'])
    }).catch((error)=>{
      this.showLoader = false;
      this.errorMsg = error.message
      this.showError = true;
    })
  }

}
