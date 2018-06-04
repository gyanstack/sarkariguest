import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './gallery/item-detail/item-detail.component';
import { FlightDealComponent } from './flight-deal/flight-deal.component';
// import {}

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            animation: 'home'
        }
    },
    {
        path: 'gallery/item',
        component: ItemDetailComponent,
        data: {
            animation: 'gallery'
        }
    },
    {
        path: 'flight-deal',
        component: FlightDealComponent
    }
    // {
    //     path: 'home',
    //     redirectTo: '',
    //     pathMatch: 'full'
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
