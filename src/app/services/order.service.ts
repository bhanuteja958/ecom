import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order:any = {};
  deliveryAddress:any={}

  constructor(
      private cartService:CartService,
      private userService:UserService
    ) { 
      window.addEventListener("unload",()=>{
        sessionStorage.setItem("deliveryAddress",JSON.stringify(this.deliveryAddress));
      });

      if(sessionStorage.getItem("deliveryAddress") != null){
        this.deliveryAddress = JSON.parse(sessionStorage.getItem("deliveryAddress"))
      }
      else{
        this.deliveryAddress = {};
      }
    }

  getOrderId():string{
    return Math.floor(Math.random()*Math.pow(10,15)).toString();
  }

  getDate():string{
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  getOrder():Promise<any>{
    return new Promise((resolve,reject)=>{
      this.userService.getUser().then((user)=>{
        this.order = {
          orderId:this.getOrderId(),
          orderStatus:0,
          orderItems:this.cartService.cart,
          subTotalPrice:this.cartService.total,
          totalPrice:this.cartService.total*1.1+500,
          taxPrice:Math.floor(this.cartService.total*0.1),
          deliveryAddress:this.deliveryAddress,
          userId:this.userService.userId,
          paymentType:"Cash on Delivery",
          orderDate:this.getDate(),
          customerName:"Bhanu",
          deliveredDate:"",
        }
        resolve(this.order)
      }).catch((error)=>{
        reject(error.message)
      })
    })
   
    
  }

  saveOrder():Promise<any>{
    return new Promise((resolve,reject)=>{
      this.getOrder().then(()=>{
        console.log(this.order.orderId)
        firestore().collection("orders").doc(this.order.orderId).set(this.order).then(()=>{
          resolve("order done");
        }).catch((error)=>{
          reject(error.message)
        })
      })
      
    })
  }

  setDeliveryAddress(address:any){
    this.deliveryAddress = address;
  }
}
