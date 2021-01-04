import { Component, OnInit } from '@angular/core';
import {auth, firestore} from 'firebase';
import { Router } from '@angular/router';
import { AddressType } from '../models/address.model';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  showLoader: boolean = false;
  errorMsg: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  showForm: boolean = true;
  address:Object;
  countries: ReadonlyArray<string>;
  user:any = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAddressSubmit(addressForm): void{
    console.log(addressForm);
    this.showLoader = true;
    this.showForm = false;
    this.showError = false;
    this.address = {
      name:addressForm.fullName,
      email: addressForm.email,
      address1: addressForm.addressLine1,
      address2: addressForm.addressLine2,
      city: addressForm.city,
      state: addressForm.state,
      zip: addressForm.ZIPCode,
      country: "India",
      phoneNumber: addressForm.phoneNumber
    };
    console.log(this.address);
    this.addToAddresses(addressForm);
  }
  addToAddresses(addressForm): void{
    auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        //Uncomment when user storage structure is fixed
        // user.addresses.push(this.address);
        firestore().collection("users").doc(user.uid).get().then((doc)=>{
          this.user = doc.data();
          console.log(this.user.addresses);
        }).then(()=>{
          firestore().collection("users").doc(user.uid).set({
            addresses:[...this.user.addresses,this.address]
          },{merge:true}).then(()=>{
            console.log("updated");
          })
        })
        this.showError = false
        this.showLoader = false;
        this.showSuccess = true;
        this.showForm = false;
        setTimeout(()=>{
          this.router.navigate(['/select-address']);
        },1000);
      } else{
        this.showLoader = false;
        this.showForm = true;
        this.errorMsg = "Please signup first!"
        this.showError = true;
      }
    })
  }
}
