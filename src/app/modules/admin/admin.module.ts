import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';
import { AdminManagerComponent } from './adminManager/admin-manager/admin-manager.component';
import { AdminMenuComponent } from './adminManager/admin-menu/admin-menu.component';
import { ScheduleAirlineComponent } from './adminManager/schedule-airline/schedule-airline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import { CommonGuard } from 'src/app/gaurds/common.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule } from "@angular/material/table";
import { ManageCouponsComponent } from './adminManager/manage-coupons/manage-coupons.component';
import { AddAirlineComponent } from './adminManager/add-airline/add-airline.component';
import { ManageFlightsComponent } from './adminManager/manage-flights/manage-flights.component';
import { ManageReportsComponent } from './adminManager/manage-reports/manage-reports.component';
import { PassengerBookingsComponent } from './adminManager/passenger-bookings/passenger-bookings.component';


@NgModule({
  declarations: [
    
    AdminSigninComponent,
    AdminManagerComponent,
    AdminMenuComponent,
    ScheduleAirlineComponent,
    ManageCouponsComponent,
    AddAirlineComponent,
    ManageFlightsComponent,
    ManageReportsComponent,
    PassengerBookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatTableModule
  ],
  providers:[CommonService,LoginService,CommonGuard]
})
export class AdminModule { }
