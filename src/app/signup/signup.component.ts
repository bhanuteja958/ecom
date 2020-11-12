import { Component, OnInit } from '@angular/core';
import {auth,firestore} from 'firebase'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showLoader:boolean = false;
  errorMsg:string ='';
  showError:boolean = false;
  showSuccess:boolean = false;
  showForm:boolean = true;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSignUpSubmit(signupForm){
    this.showLoader = true;
    this.showForm = false;
    this.showError = false;
    let email = signupForm.controls.email.value;
    let password = signupForm.controls.password.value;
    let firstName = signupForm.controls.firstName.value;
    let lastName = signupForm.controls.lastName.value;
    auth().createUserWithEmailAndPassword(email,password).then(()=>{
     return  firestore().collection('users').add({
        userName:`${firstName} ${lastName}`,
        email:email,
        address:[],
        orders:[],
        phoneNumber:''
     })
    }).then(()=>{
      this.showError = false
      this.showLoader = false;
      this.showSuccess = true;
      this.showForm = false;
      setTimeout(()=>{
        this.router.navigate(['/'])
      },2000)
    }).catch((error)=>{
      this.showLoader = false;
      this.showForm = true;
      this.errorMsg = error.message
      this.showError = true;
    })
  } 




}
