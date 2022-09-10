import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from './userManager/book-flight/book-flight.component';
import { SearchFlightComponent } from './userManager/search-flight/search-flight.component';
import { UserManagerComponent } from './userManager/user-manager/user-manager.component';
import { ManageBookingsComponent } from './userManager/manage-bookings/manage-bookings.component';
import { BookingHistoryComponent } from './userManager/booking-history/booking-history.component';


const routes: Routes = [
  //{
    // {path:"searchFlights",component:SearchFlightComponent},
    //             {path:"bookFlight",component:BookFlightComponent}

  //} 
  {
    path : "DashBoard",component: UserManagerComponent,
    children : [
                {path:"searchFlights",component:SearchFlightComponent},
                {path:"bookFlight",component:BookFlightComponent},
                {path:"manageBooking",component:ManageBookingsComponent},
                {path:"histroy",component:BookingHistoryComponent},

              ] 
  }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
