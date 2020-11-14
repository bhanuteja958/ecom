import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"shop",component:ShopComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"cart",component:CartComponent},
  {path:"user",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
