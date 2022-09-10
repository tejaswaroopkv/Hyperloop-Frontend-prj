import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {
  manageBookingForm : any;
  isSearched:boolean=false;
  flightData :any=[];
  PNRNumber:any
  tripType:any;


  constructor(private formBuilder: FormBuilder,private commonService:CommonService) { }

  ngOnInit(): void {
    this.setForm();
    //this.loadBookedFlights();
  }
  setForm() {
    this.manageBookingForm = this.formBuilder.group({
      tripType: [, Validators.required],
      PNRNumber: ['', Validators.required]
     
    })
    this.resetForm();
  }
  changeTripType(event:any){
    //copy the same logic of summary and payment
    //console.log(event)
    //console.log(this.isEnableReturnDate)
    this.manageBookingForm.value.tripType  = event.target.value==2?2:1;
    console.log(this.manageBookingForm.tripType.value)
  }
  resetForm(){
    this.manageBookingForm.reset();
  }
  onSubmit(){
    this.isSearched=true;
    this.PNRNumber = this.manageBookingForm.value.PNRNumber
    this.tripType = this.manageBookingForm.value.tripType
    this.loadBookedFlights()
  }
  loadBookedFlights(){
    // this.commonService.getData("fetchData").subscribe(data=>{
    //   this.flightData = data;
    //   console.log(this.flightData)
    // });
    this.commonService.getUserServiceData("user/flight/getTicket?pnr="+this.PNRNumber + "&type="+this.tripType).subscribe(data=>{
     // this.commonService.getUserServiceData("getTicket?pnr="+this.PNRNumber + "&type="+this.tripType).subscribe(data=>{  
    this.flightData = data;
      console.log(this.flightData.data)
    });
  }
  deleteScheduledFlight(data:any){
    confirm("Action will result in canceling the flight");
    data.isCanceled=true
    this.commonService.postUserServiceData("user/flight/deleteBooking",data).subscribe(res=>{
      //this.commonService.postUserServiceData("deleteBooking",data).subscribe(res=>{  
    this.loadBookedFlights();
    })
  }

}
