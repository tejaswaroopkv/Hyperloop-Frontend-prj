import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';
import { AdminManagerComponent } from './adminManager/admin-manager/admin-manager.component';
import { CommonGuard } from 'src/app/gaurds/common.guard';
import { ScheduleAirlineComponent } from './adminManager/schedule-airline/schedule-airline.component';
import { ManageCouponsComponent } from './adminManager/manage-coupons/manage-coupons.component';
import { AddAirlineComponent } from './adminManager/add-airline/add-airline.component';
import { ManageFlightsComponent } from './adminManager/manage-flights/manage-flights.component';
import { ManageReportsComponent } from './adminManager/manage-reports/manage-reports.component';
import { PassengerBookingsComponent } from './adminManager/passenger-bookings/passenger-bookings.component';



const routes: Routes = [
  {
    path:"login",component:AdminSigninComponent
  },
  {
    path : "DashBoard",component: AdminManagerComponent,
    canActivate:[CommonGuard],children:
    [
      {
        path:"scheduleAirline",component:ScheduleAirlineComponent
      },
      {
        path:"manageFlight",component:ManageFlightsComponent
      },
      {
        path:"manageCoupon",component:ManageCouponsComponent
      },
      {
        path:"addAirline",component:AddAirlineComponent
      },
      {
        path:"manageReports",component:ManageReportsComponent
      },
      {
        path:"passengerBookings",component:PassengerBookingsComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
