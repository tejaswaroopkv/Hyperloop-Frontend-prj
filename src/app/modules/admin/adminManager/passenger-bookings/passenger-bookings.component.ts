import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-passenger-bookings',
  templateUrl: './passenger-bookings.component.html',
  styleUrls: ['./passenger-bookings.component.scss']
})
export class PassengerBookingsComponent implements OnInit {

  constructor(private commonService:CommonService) { }
  flightData :any;

  ngOnInit(): void {
    this.loadBookedFlights();
  }

  loadBookedFlights(){
    
    this.commonService.getUserServiceData("admin/flight/getPassengerBookings").subscribe(data=>{
      //this.commonService.getUserServiceData("getBookingHistroy?email="+this.email).subscribe(data=>{  
    this.flightData = data;
      console.log(this.flightData)
      this.flightData = this.flightData['data']
    });
  }

}
