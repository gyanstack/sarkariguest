import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightDealRoutingModule } from './flight-deal-routing.module';
import { FlightDealComponent } from './flight-deal.component';
import { CustomMaterialModuleModule } from '../shared/modules/custom-material-module.module';

@NgModule({
  imports: [
    CommonModule,
    FlightDealRoutingModule,
    CustomMaterialModuleModule
  ],
  declarations: [FlightDealComponent]
})
export class FlightDealModule { }
