import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.scss']
})
export class ManageReportsComponent implements OnInit {

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

}
