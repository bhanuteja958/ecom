import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:"",component:HomeComponent ,data:{animation:"Home"}},
  {path:"shop",component:ShopComponent, data:{animation:"Shop"}},
  {path:"signup",component:SignupComponent,data:{animation:"signup"}},
  {path:"login",component:LoginComponent,data:{animation:"login"}},
  {path:"product/:id",component:ProductComponent,data:{animation:"product"}},
  {path:"cart",component:CartComponent,data:{animation:"cart"}},
  {path:"user",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:"addresses",component:AddressesComponent,data:{animation:"address"}},
  {path:"order",component:OrderComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
