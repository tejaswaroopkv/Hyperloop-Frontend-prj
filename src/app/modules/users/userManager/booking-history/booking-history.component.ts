import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  bookingHistroyForm :any
  constructor(private formBuilder: FormBuilder,private commonService:CommonService) { }
  isSearched:boolean=false;
  flightData :any;
  email:any;

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.bookingHistroyForm = this.formBuilder.group({
      emailid: ['', [Validators.required,Validators.pattern("([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z]{2,4})")]],
      
     
    })
    this.resetForm();
  }
  resetForm(){
    this.bookingHistroyForm.reset();
  }
  onSubmit(){
    this.isSearched=true;
    this.email = this.bookingHistroyForm.value.emailid
    this.loadBookedFlights()
  }
  loadBookedFlights(){
    // this.commonService.getData("fetchHistroyData").subscribe(data=>{
    //   this.flightData = data;
    //   console.log(this.flightData)
    // });
    this.commonService.getUserServiceData("user/flight/getBookingHistroy?email="+this.email).subscribe(data=>{
      //this.commonService.getUserServiceData("getBookingHistroy?email="+this.email).subscribe(data=>{  
    this.flightData = data;
      console.log(this.flightData)
      this.flightData = this.flightData['data']
    });
  }
}
