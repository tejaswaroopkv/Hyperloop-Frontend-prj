import { Component, OnInit, Input } from '@angular/core';
import { jsPDF } from "jspdf";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {


  constructor(private router:Router) { }

  @Input()
  ticketDetails:any;
  printDetails:any=[];
  isprintSuccess:boolean=false;
  isNavigate:boolean=false;

  ngOnInit(): void {
    debugger;
    console.log(this.ticketDetails)
    this.ticketDetails = this.ticketDetails.data;
  }
  printData(){
    console.log(this.ticketDetails)
    //this.msgs.push('PNR Number '+ticket.pnrNumber);
   // this.msgs.push('Passenegr Name : ' + ticket.passengerName);
    //this.msgs.push('Passenegr Gender : ' + ticket.passengerGender);
    this.ticketDetails.forEach(element => {
      this.printDetails.push('Name :' + element.name)
      this.printDetails.push('Email :' + element.email)
      this.printDetails.push('Contact :' + element.contact)
      this.printDetails.push('Airline :' + element.airlineName)
      this.printDetails.push('Fight Code :' + element.flightCode)
      this.printDetails.push('price :' + element.price)
      this.printDetails.push('Departure PNR :' + element.departurePNR)
      this.printDetails.push('return PNR :' + element.returnPNR)
      this.printDetails.push('From :' + element.sourcePlace)
      this.printDetails.push('To :' + element.destinationPlace)

    });

    var doc = new jsPDF;
    doc.text(this.printDetails, 8, 8);
    doc.save('Ticket_Details');
    this.printDetails = [];
    this.isprintSuccess=true;
    this.navigateToHome();

    //this.printDetails
  }
  navigateToHome(){
    //navigate to home after saving passangers into json/db
    console.log("navigate to home")
    this.isNavigate=true;
    this.router.navigate(["user/DashBoard/bookFlight"])
  }

}
