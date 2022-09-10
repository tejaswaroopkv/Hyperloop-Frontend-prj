import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { DatePipe } from '@angular/common';
import  *  as  bookingcols  from  '../../../../../assets/data/bookingTable.json';
import  *  as  passangercols  from  '../../../../../assets/data/passangerTableCol.json';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  //@ViewChild(BookFlightComponent) FlightComponent!: BookFlightComponent ;

  

  constructor(private commonService:CommonService,private formBuilder: FormBuilder) { }

  searchCriteria: any =[];
  scheduledFlights:any=[];
  isRoundTrip:boolean=false;
  singleSearchResults:any=[];
  roundSearchResults:any=[];
  selectedSingleWay:any = null;
  selectedReturnWay:any = null;
  isSingleWayBookingConfirmed:boolean=false;
  isRoundTripTabEnabled:boolean=false;
  isUserDetailsTabEnabled:boolean=false;
  isPaymentTabEnabled:boolean=false;
  isRoundTripBookingConfirmed:boolean=false;
  isUserDetailsField:boolean=false;
  passangerDetailsForm : any;
  displayedColumns:any;
  passangersList:any=[];
  passangerTableCols:any;
  isPrimaryContactPresent:boolean=false;
  totalTicketCost:number=0;
  isremoveAllTabs:boolean=false;
  enableTicketTab:boolean=false;
  statusVal:boolean=false;
  ticketData:any;
  ngOnInit() {
   this.setForm();
   this.flightSearchFormData();
   this.fetchAirportData();
   this.displayedColumns = (bookingcols as any).default
   this.passangerTableCols =  (passangercols as any).default
   console.log(this.displayedColumns)
  }
  setForm(){
    this.passangerDetailsForm = this.formBuilder.group({
      passangerName: ['', Validators.required],
      emailId: ['', [Validators.required]],
      contactNumber: ['', Validators.required],
      age:['',Validators.required],
      isPrimary :[false]
    })
    this.resetForm();
   }
  flightSearchFormData(){
    this.searchCriteria = JSON.parse(this.commonService.getSessionValue('searchFlights') as any);
  }
  fetchAirportData(){
    //this.commonService.getCommonServiceData("getScheduledFlightData").subscribe(data=>{
      this.commonService.getCommonServiceData("common/flight/getScheduledFlightData").subscribe(data=>{
      this.scheduledFlights=data['data']
      if(this.scheduledFlights.length>0){
        this.filterSearchResults();
      }
     // console.log(this.scheduledFlights)
    });
   
  }
  filterSearchResults(){
    let DeptFormatedDate='';
    let returnFormatedDate='';
    let pipe:any;
    let now:any;
     pipe = new DatePipe('en-IN');
     //now = Date.now();
    console.log(this.scheduledFlights)
    console.log(this.searchCriteria);
    console.log(this.isRoundTrip)
    this.isRoundTrip = this.searchCriteria.tripType==2?true:false;
    if(this.isRoundTrip){
      DeptFormatedDate = pipe.transform(this.searchCriteria.departureDate, 'dd-MM-yyyy');
      returnFormatedDate = pipe.transform(this.searchCriteria.returnDate, 'dd-MM-yyyy');
      this.scheduledFlights.forEach(element => {
        if(element.srcid==this.searchCriteria.sourcePlaceId && element.destid==this.searchCriteria.destinationPlaceId && DeptFormatedDate==element.departureDate){
          this.singleSearchResults.push(element);
          if(returnFormatedDate==element.returnDate){
            this.roundSearchResults.push(element);
          }
        }
        if(element.destid==this.searchCriteria.sourcePlaceId && element.srcid==this.searchCriteria.destinationPlaceId && returnFormatedDate==element.returnDate){
          this.roundSearchResults.push(element);
        }
      });
    }else{
      DeptFormatedDate = pipe.transform(this.searchCriteria.departureDate, 'dd-MM-yyyy');
      this.scheduledFlights.forEach(element => {
        if(element.srcid==this.searchCriteria.sourcePlaceId && element.destid==this.searchCriteria.destinationPlaceId && DeptFormatedDate==element.departureDate){
          this.singleSearchResults.push(element);
        }
      });
    }
    console.log(this.singleSearchResults);
    console.log(this.roundSearchResults);
    //this.renderData()
 }
 onSingleWaySelection(row:any){
   console.log(row)
   this.selectedSingleWay = row;
 }
 onReturnWaySelection(row:any){
  console.log(row)
  this.selectedReturnWay = row;
 }
 onSingleWayConfirmation(){
  this.isSingleWayBookingConfirmed=true;
  this.isRoundTripTabEnabled=true;
  this.isUserDetailsTabEnabled=!this.isRoundTrip?true:false;
  let price = '';
  price = this.selectedSingleWay.price;
  price = price.replace('$', '')
  this.totalTicketCost =+price; 
  console.log(this.totalTicketCost);

 }
 onReturnWayConfirmation(){
  this.isRoundTripBookingConfirmed=true;
  this.isUserDetailsTabEnabled=true;
  let price = '';
  let returnPrice=0;
  price = this.selectedReturnWay.price;
  price = price.replace('$', '');
  returnPrice =+price;
  this.totalTicketCost = this.totalTicketCost+returnPrice; 
  console.log(this.totalTicketCost);
 }

resetForm(){
  this.passangerDetailsForm.reset();
}
onPassangersSubmission(){
  let flag=0;
  this.isUserDetailsTabEnabled=false;
  this.isPaymentTabEnabled=true;
  this.roundSearchResults=[];
  this.singleSearchResults=[];
  let passengerCount =  this.passangersList.length;
  this.totalTicketCost = this.totalTicketCost*passengerCount;
  this.isremoveAllTabs=true;
  if(passengerCount==1){
    this.passangersList[0].isPrimary = true;
  }
  this.passangersList.forEach(element => {
    if(element.isPrimary==true){
      flag=1;
    }
  });
  if(flag==0){
    this.passangersList[0].isPrimary = true;
  }
  console.log(this.passangersList)
}
  addPassenger(){
    debugger;
    console.log(this.passangerDetailsForm.value)
    if(this.passangerDetailsForm.value.isPrimary==true){
      this.isPrimaryContactPresent=true;
    }
    if(this.passangerDetailsForm.value.isPrimary==null){
      this.passangerDetailsForm.value.isPrimary=false;
    }
    this.passangersList.push(this.passangerDetailsForm.value)
    console.log(this.passangersList)
    this.resetForm();
  }
  forwordTicket(data:any){
    this.ticketData = data;
    this.enableTicketTab =true;
  }
  ticketStatus(status:any){
    debugger;
    console.log(status)
    this.statusVal = status
  }




}
