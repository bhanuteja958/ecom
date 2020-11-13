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
  address: AddressType;
  countries: ReadonlyArray<string>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAddressSubmit(addressForm): void{
    this.showLoader = true;
    this.showForm = false;
    this.showError = false;
    this.address = {
      email: addressForm.email,
      address1: addressForm.address1,
      address2: addressForm.address2,
      city: addressForm.city,
      state: addressForm.state,
      zip: addressForm.ZIPCode,
      country: addressForm.country,
      phoneNumber: addressForm.phoneNumber
    };
    this.addToAddresses();
  }
  addToAddresses(): void{
    auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        //Uncomment when user storage structure is fixed
        // user.addresses.push(this.address);
        this.showError = false
        this.showLoader = false;
        this.showSuccess = true;
        this.showForm = false;
        setTimeout(()=>{
          this.router.navigate(['/']);
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
