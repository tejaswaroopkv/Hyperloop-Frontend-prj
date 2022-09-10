import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.scss']
})
export class ManageFlightsComponent implements OnInit {

  constructor(private commonService:CommonService) { }
  flightData :any;

  ngOnInit(): void {
    this.loadSheduledFlights();

  }
  loadSheduledFlights(){
    this.commonService.getCommonServiceData("common/flight/getScheduledFlightData").subscribe(data=>{
     //this.commonService.getCommonServiceData("getScheduledFlightData").subscribe(data=>{  
    this.flightData = data['data'];
      console.log(this.flightData)
    });
  }
  deleteScheduledFlight(data:any){
    confirm("Action will result in blocking the flight");
    data.isAvailable=false
    // this.commonService.putData("flightData/"+data.id,data).subscribe(res=>{
    //   this.loadSheduledFlights();
    // })
    this.commonService.postServiceData("admin/flight/addFlight",data).subscribe(res=>{
      this.loadSheduledFlights();
      console.log(res);
    })
  }

}
