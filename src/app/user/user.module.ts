import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './order/order.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [AccountComponent, OrderComponent, SummaryComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
