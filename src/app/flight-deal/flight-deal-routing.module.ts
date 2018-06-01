import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightDealComponent } from './flight-deal.component';

const routes: Routes = [
  {
    path: '',
    component: FlightDealComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightDealRoutingModule { }
