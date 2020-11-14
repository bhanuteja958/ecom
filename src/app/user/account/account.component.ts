import { Component, OnInit } from '@angular/core';
import {firestore,auth} from 'firebase'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user:any = {};
  editInfo:boolean = false;
  constructor() { }

  ngOnInit() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        firestore().collection('users').doc(user.uid).get().then((doc)=>{
          this.user = doc.data();
        })  
      }
    })
  }

  isEditable(){
    if(this.editInfo === true){
      return true;
    }
    else{
      return false;
    }
  }

  onEditClick(){
    this.editInfo = !this.editInfo;
  }

}
