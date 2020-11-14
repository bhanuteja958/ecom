import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
