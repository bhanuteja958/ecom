import { Component, OnInit } from '@angular/core';
import {firestore,auth} from 'firebase'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user:any = {};
  userId:string;
  editInfo:boolean = false;
  errorMsg:string;
  phoneLength:boolean;
  showError:boolean = false;
  showSuccess:boolean = false;
  constructor() { }

  ngOnInit() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        firestore().collection('users').doc(user.uid).get().then((doc)=>{
          this.user = doc.data();
          this.userId = doc.id;
          if(this.user.phoneNumber >0){
            this.phoneLength = true;
          }
          else{
            this.phoneLength = false;
          }
        })  
      }
    })
  }

  isEditable():boolean{
    if(this.editInfo === true){
      return true;
    }
    else{
      return false;
    }
  }

  onEditClick():void{
    this.editInfo = !this.editInfo;
  }

  saveDetails(accountForm:any):void{
    firestore().collection('users').doc(this.userId).set({
      userName :accountForm.value.userName,
      phoneNumber:accountForm.value.phone
    },{merge:true}).then(()=>{
      this.showSuccess = true;
      setTimeout(()=>{
        this.showSuccess = false;
        this.editInfo = false;
      },2000)
    }).catch((error)=>{
      this.errorMsg = error.message;
      this.showError = true;
      setTimeout(()=>{
        this.showError = false;
      },2000)
    })
  }

  checkPhoneNumberLength(phoneNumber:number):void{
    if(phoneNumber.toString().length != 10){
      this.phoneLength = false;
    }
    else{
      this.phoneLength = true;
    }
  }

}
