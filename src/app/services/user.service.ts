import { Injectable } from '@angular/core';
import {auth, firestore} from 'firebase'
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any ={};
  userId:any = "";
  getUserFromDatabase:boolean=false;

  constructor() { 
    // window.addEventListener("unload",(event)=>{
    //   sessionStorage.setItem("user",JSON.stringify(this.user));
    // })
  }

  getUser():Promise<any>{
    return new Promise((resolve,reject)=>{
      auth().onAuthStateChanged((user)=>{
        if(user){
          if(sessionStorage.getItem("user") === null || this.getUserFromDatabase){
            firestore().collection('users').doc(user.uid).get().then((doc)=>{
              this.userId = user.uid;
              this.user = doc.data();
              sessionStorage.setItem("user",JSON.stringify(this.user));
              resolve(doc.data());
            }).catch((error)=>{
              reject(error.msg);
            })
            this.getUserFromDatabase = false;
          }
          else{
            this.user = JSON.parse(sessionStorage.getItem("user"));
            resolve(JSON.parse(sessionStorage.getItem("user")))
          }
        }
      })
    })
  }

  getAddresses(){

  }

  clearUser():void{
    this.user = {};
    sessionStorage.removeItem('user');
  }


}
