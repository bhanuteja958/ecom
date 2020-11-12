import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  products:any[] = [];
  constructor() {
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

  



 
}
