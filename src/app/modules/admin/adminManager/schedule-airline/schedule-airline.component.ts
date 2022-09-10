import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-airline',
  templateUrl: './schedule-airline.component.html',
  styleUrls: ['./schedule-airline.component.scss'],
  providers: [DatePipe]
})
export class ScheduleAirlineComponent implements OnInit {
  scheduleFlightForm:any;
  airlineData:any=[];
  fightCodeData:any=[];
  sourceLoc:any;
  destinationLoc:any;
  airlineInfo:any=[];
  prepareScheduleFightPostBody:any={}
  flightcodeOptions:any=[];
  airportData:any=[];
  date=new Date();
  flightCodeOptionData:any=[]
  //airlineIds:any=[];

  constructor(private commonService:CommonService,private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setForm();
    this.loadAirlineData();
    this.loadAirportData();
  }
  loadAirlineData(){
    //this.commonService.getData("airlineInfo").subscribe(data=>{
    this.commonService.getCommonServiceData("common/flight/getAirlineInfo").subscribe(data=>{
      //this.commonService.getCommonServiceData("getAirlineInfo").subscribe(data=>{  
    this.airlineData = data['data'];
      this.airlineData.forEach(element => {
        this.airlineInfo.push({"label":element.airlineName,"value":element.airlineId});
        this.fightCodeData.push({"id":element.airlineId,"extraValue":element.flightCode})    
      });
      console.log(this.airlineInfo)
      console.log(this.fightCodeData)
    });
  }
  loadAirportData(){
    //this.airportData = JSON.parse(this.commonService.getSessionValue('airportData') as any);
    this.commonService.getCommonServiceData("common/flight/getAirportData").subscribe(data=>{
     // this.commonService.getCommonServiceData("getAirportData").subscribe(data=>{  
    this.airportData = data['data'];
    });
    console.log(this.airportData);
  }
  setForm(){
    this.scheduleFlightForm = this.formBuilder.group({
      airlineid: ['', Validators.required],
      flightcode:['', Validators.required],
      srcid:['', Validators.required],
      destid:['', Validators.required],
      departureDate:['', Validators.required],
      returnDate:['', Validators.required],
      price:['', Validators.required],
      totalSeats:['',Validators.required],
      isAvailable:[true]
      
    })
    this.resetForm();
  }
  onAirlineChange(){
    this.flightcodeOptions=[];
    let id = this.scheduleFlightForm.value.airlineid;
    this.fightCodeData.forEach(element => {
      if(element.id==id){
        element.extraValue.forEach(ele => {
          this.flightcodeOptions.push({"label":ele.flightCode,"value":ele.flightCodeId})
        });
        console.log(element)
        console.log(this.flightcodeOptions)
      }
      
    });
    this.airlineData.forEach(element => {
      if(element.airlineid==id){
        this.prepareScheduleFightPostBody.logoUrl = element.logoUrl
      }
    });
    
  }
  resetForm(){
    this.scheduleFlightForm.reset();
  }
  onSubmit(){
    let pipe:any;
    pipe = new DatePipe('en-IN');
    console.log(this.scheduleFlightForm.value)
    this.prepareScheduleFightPostBody.airlineId=this.scheduleFlightForm.value.airlineid
    this.prepareScheduleFightPostBody.flightCodeId=this.scheduleFlightForm.value.flightcode;
    this.prepareScheduleFightPostBody.srcid=this.scheduleFlightForm.value.srcid;
    this.prepareScheduleFightPostBody.destid=this.scheduleFlightForm.value.destid
    this.prepareScheduleFightPostBody.departureDate=pipe.transform(this.scheduleFlightForm.value.departureDate, 'dd-MM-yyyy');
    this.prepareScheduleFightPostBody.returnDate=pipe.transform(this.scheduleFlightForm.value.returnDate, 'dd-MM-yyyy');
    this.prepareScheduleFightPostBody.price=this.scheduleFlightForm.value.price;
    this.prepareScheduleFightPostBody.isAvailable = true; 
    this.prepareScheduleFightPostBody.totalSeats = this.scheduleFlightForm.value.totalSeats;
    console.log(this.prepareScheduleFightPostBody)
    this.commonService.postServiceData("admin/flight/addFlight",this.prepareScheduleFightPostBody).subscribe(data=>{
      console.log(data)
    });
    this.resetForm();

 //this.prepareScheduleFightPostBody.airlineid=this.scheduleFlightForm.value.airline.value
    //this.prepareScheduleFightPostBody.id=JSON.stringify(Math.floor((Math.random() * 100) + 1));
     // this.airlineInfo.forEach(element => {
    //   if(element.value==this.scheduleFlightForm.value.airlineid){
    //     this.prepareScheduleFightPostBody.airlineName=element.label
    //   }
    // });
    //this.prepareScheduleFightPostBody.createdDate = this.commonService.getCurrentDate();
    // this.airportData.forEach(element => {
    //   if(element.airportId==this.prepareScheduleFightPostBody.srcid){
    //     this.prepareScheduleFightPostBody.sourcePlace=element.city
    //   }
    //   if(element.airportId==this.prepareScheduleFightPostBody.destid){
    //     this.prepareScheduleFightPostBody.destinationPlace=element.city
    //   }
    // });
    // this.date = new Date();
    // this.prepareScheduleFightPostBody.createdDate = this.datePipe.transform(this.date, 'dd-MM-yyyy')
    //console.log(this.prepareScheduleFightPostBody)
  }

}
