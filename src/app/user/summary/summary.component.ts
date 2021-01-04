import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  orderId:string = '';
  order:any = {}

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get("orderId")
    firestore().collection("orders").doc(this.orderId).get().then((doc)=>{
      this.order = doc.data();
    })
  }

  onCancelOrderClick(){
    firestore().collection("orders").doc(this.orderId).set({
      orderStatus:2
    },{merge:true}).then(()=>{
      window.location.reload();
    })
  }

}
