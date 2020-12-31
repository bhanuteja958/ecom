import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';

import * as firebase from 'firebase';
import { LoaderComponent } from './loader/loader.component';
import { CartComponent } from './cart/cart.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AboutUsComponent } from './about-us/about-us.component'

var firebaseConfig = {
  apiKey: "AIzaSyCxij-K5h3PI6adLgOhn8IIAppnzBvuGnU",
  authDomain: "ecom-9d73f.firebaseapp.com",
  databaseURL: "https://ecom-9d73f.firebaseio.com",
  projectId: "ecom-9d73f",
  storageBucket: "ecom-9d73f.appspot.com",
  messagingSenderId: "696001150741",
  appId: "1:696001150741:web:22b2000182bac57bac331c",
  measurementId: "G-B4RCF3C1NP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    LoaderComponent,
    CartComponent,
    AddressesComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
