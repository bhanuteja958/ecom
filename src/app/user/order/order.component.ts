import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth, firestore } from 'firebase';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:any[] = []

  constructor(private router:Router) { }

  ngOnInit() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        firestore().collection('orders').where("userId","==",user.uid).get().then((querySnapshot)=>{
          querySnapshot.docs.forEach((doc)=>{
            this.orders.push(doc.data());
          })
        })
      }
      else{
        this.orders = [];
      }
    })
  }


  onViewSummaryClick(orderId:string){
    this.router.navigate([`user/summary/${orderId}`])
  }

}
