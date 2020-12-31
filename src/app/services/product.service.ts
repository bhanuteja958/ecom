import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {auth, firestore} from 'firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  products:any[] = [];
  constructor(private userService:UserService) {
      window.addEventListener("unload",(event)=>{
        sessionStorage.setItem("prodcuts",JSON.stringify(this.products));
      })
        
   }

  getProducts():Promise<any[]>{
    return new Promise((resolve,reject)=>{
      if(sessionStorage.getItem("products")=== null){
        firestore().collection('aggregation').doc("cards").get().then((doc)=>{
          this.products = doc.data().decks;
          resolve(doc.data().decks)
        }).catch((err)=>{
          reject(err);
        });
      }
      else{
        resolve(JSON.parse(sessionStorage.getItem("products")));
      }

    })
  }

  getProduct(productId):Promise<any>{
    return new Promise((resolve,reject)=>{
      firestore().collection("cards").doc(productId).get().then((doc)=>{
        resolve(doc.data());
      }).catch((error)=>{
        reject(error.message);
      })
    })
  }

  addComment(productId:string,comment:string,product:any,uid:string){
    return new Promise((resolve,reject)=>{
      this.userService.getUser().then((user)=>{
        firestore().collection("cards").doc(productId).set({
          comments:[...product.comments,{
            userId:uid,
            userName:user.userName,
            comment:comment
          }]
        },{merge:true}).then(()=>{
          resolve("comment added")
        }).catch((error)=>{
          resolve("error adding comment")
        })
      })
    })
      
  }

 
  



 
}
