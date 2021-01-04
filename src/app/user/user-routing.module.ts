import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './order/order.component';
import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  {path:'account',component:AccountComponent},
  {path:'orders',component:OrderComponent},
  {path:"summary/:orderId",component:SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
