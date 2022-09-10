import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import  *  as  passangercols  from  '../../../../../assets/data/passangerTableCol.json';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  strikeCheckout:any = null;

  constructor(private commonService:CommonService,private router:Router) { }
  @Input()
  totalTicketCost:number=0;
  @Input()
  passangersList:any=[];
  @Input()
  selectedSingleWay:any=[];
  @Input()
  selectedReturnWay:any=[];
  @Input()
  isRoundTrip:boolean=false;

  @Output() 
  ticketData = new EventEmitter();
  @Output() 
  paymentStatus = new EventEmitter();

  passangerTableCols:any;
  ticketCount:number=0;
  currentCount:number=0;
  PNRDNumber:string='PNRDFLY90';
  PNRRNumber:string='PNRRFLY90';
  coPassengers:any=[];
  passangerData:any={};
  //primaryPassanger:any={};
  isPaymentSuccessful:boolean=false;
  isNavigate:boolean=false;
  discountCouponId:any;
  discountCouponCode:any;
  discountedPrice:any
  couponData:any;
  discountCost:number=0;
  eachTicketCost:number=0;
  passengers:any=[];
  reversePassengers:any=[];
  responseData:any;

  ngOnInit(): void {
    this.loadCouponData();
    this.discountCost = this.totalTicketCost;
    console.log(this.totalTicketCost)
    console.log(this.passangersList)
    this.sortPassangers();
    this.passangerTableCols =  (passangercols as any).default
  }
  loadCouponData(){
    this.commonService.getCommonServiceData("common/flight/getCouponData").subscribe(data=>{
    //this.commonService.getCommonServiceData("getCouponData").subscribe(data=>{
      this.couponData=data['data'];
      console.log(this.couponData)
    });
  }
  sortPassangers(){
    this.passangersList.sort((a,b) => b.isPrimary - a.isPrimary);
    console.log(this.passangersList)
  }
  applyCoupon(){
    console.log(this.discountCouponId);
    let price = '';
    let cost=0;
    this.couponData.forEach(element => {
      if(element.id==this.discountCouponId){
        this.discountCouponCode = element.couponCode
        this.discountedPrice = element.price;
        price = element.price;
        price = price.replace('$', '')
        cost =+price; 
        this.discountCost = this.totalTicketCost-cost;
      }
    });
   

  }
  checkout(amount) {
    this.savePassangers();
  }
  

  savePassangers(){
    var $:any;
   console.log(this.selectedSingleWay)
   console.log(this.selectedReturnWay)
   this.currentCount = this.ticketCount ;
   this.eachTicketCost = this.discountCost/this.passangersList.length;
   if(!this.isRoundTrip){
    let random = JSON.stringify(Math.floor((Math.random() * 1000) + 1));
    this.passangersList.forEach(element => {
      this.currentCount++;
      let passengerDTO:any={};
      //need to replicate the same logic in java and remove here
      if(element.isPrimary){
        this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineId + JSON.stringify(this.currentCount) + random;
        element.PNRDNumber = this.PNRDNumber;
      //this.primaryPassanger.passangerId=JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
        passengerDTO.name=element.passangerName;
        passengerDTO.age=element.age
        passengerDTO.airlineId = this.selectedSingleWay.airlineId
        passengerDTO.airlineName=this.selectedSingleWay.airlineName;
        passengerDTO.couponId =this.discountCouponId
        passengerDTO.couponCode = this.discountCouponCode
        passengerDTO.couponPrice = this.discountedPrice
        passengerDTO.flightCodeId = this.selectedSingleWay.flightCodeId
        passengerDTO.flightCode = this.selectedSingleWay.flightCode
        passengerDTO.email=element.emailId;
        passengerDTO.contact=element.contactNumber;
        passengerDTO.tripType = 1
        passengerDTO.departurePNR=this.PNRDNumber;
        passengerDTO.returnPNR='NA';
        passengerDTO.price =JSON.stringify(this.eachTicketCost)+'$'
        passengerDTO.isCancelled=false;
        passengerDTO.sourcePlace = this.selectedSingleWay.sourcePlace;
        passengerDTO.destinationPlace = this.selectedSingleWay.destinationPlace;
        passengerDTO.srcid = this.selectedSingleWay.srcid;
        passengerDTO.destid = this.selectedSingleWay.destid;
        passengerDTO.isPrimary=true;

        this.passengers.push(passengerDTO)
        //this.passangerData.id=JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
        //this.passangerData.passengerInfo =this.primaryPassanger;
      }else{
        this.PNRDNumber='PNRDFLY90';
        this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineId + JSON.stringify(this.currentCount) + random;
        element.PNRDNumber = this.PNRDNumber;
        passengerDTO.name=element.passangerName;
        passengerDTO.age=element.age
        passengerDTO.airlineId = this.selectedSingleWay.airlineId
        passengerDTO.airlineName=this.selectedSingleWay.airlineName;
        passengerDTO.couponId =this.discountCouponId
        passengerDTO.couponCode = this.discountCouponCode
        passengerDTO.couponPrice = this.discountedPrice
        passengerDTO.flightCodeId = this.selectedSingleWay.flightCodeId
        passengerDTO.flightCode = this.selectedSingleWay.flightCode
        passengerDTO.email=element.emailId;
        passengerDTO.contact=element.contactNumber;
        passengerDTO.tripType = 1
        passengerDTO.departurePNR=this.PNRDNumber;
        passengerDTO.returnPNR='NA';
        passengerDTO.price =JSON.stringify(this.eachTicketCost)+'$'
        passengerDTO.isCancelled=false;
        passengerDTO.sourcePlace = this.selectedSingleWay.sourcePlace;
        passengerDTO.destinationPlace = this.selectedSingleWay.destinationPlace;
        passengerDTO.srcid = this.selectedSingleWay.srcid;
        passengerDTO.destid = this.selectedSingleWay.destid;
        passengerDTO.isPrimary=false;
        this.passengers.push(passengerDTO)
      }
    });
    console.log(this.passengers);
   }
    
    if(this.isRoundTrip){
      let random = JSON.stringify(Math.floor((Math.random() * 1000) + 1));
      this.passangersList.forEach(element => {
       this.currentCount++;
       let passengerDTO:any={};
      //this.passangerData = element;
        if(element.isPrimary){
          this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineId + JSON.stringify(this.currentCount) + random;
          this.PNRRNumber = this.PNRRNumber + this.selectedReturnWay.airlineId + JSON.stringify(this.currentCount) + random;
          element.PNRRNumber = this.PNRRNumber;
          element.PNRDNumber=this.PNRDNumber;
          passengerDTO.name=element.passangerName;
          passengerDTO.age=element.age
          passengerDTO.airlineId = this.selectedSingleWay.airlineId
          passengerDTO.airlineName=this.selectedSingleWay.airlineName;
          passengerDTO.couponId =this.discountCouponId
          passengerDTO.couponCode = this.discountCouponCode
          passengerDTO.couponPrice = this.discountedPrice
          passengerDTO.flightCodeId = this.selectedSingleWay.flightCodeId
          passengerDTO.flightCode = this.selectedSingleWay.flightCode
          passengerDTO.email=element.emailId;
          passengerDTO.contact=element.contactNumber;
          passengerDTO.tripType = 1
          passengerDTO.departurePNR=this.PNRDNumber ;
          passengerDTO.returnPNR= this.PNRRNumber;
          passengerDTO.price =JSON.stringify(this.eachTicketCost)+'$'
          passengerDTO.isCancelled=false;
          passengerDTO.sourcePlace = this.selectedSingleWay.sourcePlace;
          passengerDTO.destinationPlace = this.selectedSingleWay.destinationPlace;
          passengerDTO.srcid = this.selectedSingleWay.srcid;
          passengerDTO.destid = this.selectedSingleWay.destid;
          passengerDTO.isPrimary=true;
          this.passengers.push(passengerDTO)
        }
        else{
          this.PNRDNumber='PNRDFLY90'
          this.PNRRNumber='PNRRFLY90'
          this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineId + JSON.stringify(this.currentCount) + random;
          this.PNRRNumber = this.PNRRNumber + this.selectedReturnWay.airlineId + JSON.stringify(this.currentCount) + random;
          element.PNRDNumber = this.PNRDNumber;
          element.PNRRNumber = this.PNRRNumber;
          passengerDTO.name=element.passangerName;
          passengerDTO.age=element.age
          passengerDTO.airlineId = this.selectedSingleWay.airlineId
          passengerDTO.airlineName=this.selectedSingleWay.airlineName;
          passengerDTO.couponId =this.discountCouponId
          passengerDTO.couponCode = this.discountCouponCode
          passengerDTO.couponPrice = this.discountedPrice
          passengerDTO.flightCodeId = this.selectedSingleWay.flightCodeId
          passengerDTO.flightCode = this.selectedSingleWay.flightCode
          passengerDTO.email=element.emailId;
          passengerDTO.contact=element.contactNumber;
          passengerDTO.tripType = 1
          passengerDTO.departurePNR=this.PNRDNumber;
          passengerDTO.returnPNR=this.PNRRNumber;
          passengerDTO.price =JSON.stringify(this.eachTicketCost)+'$'
          passengerDTO.isCancelled=false;
          passengerDTO.sourcePlace = this.selectedSingleWay.sourcePlace;
          passengerDTO.destinationPlace = this.selectedSingleWay.destinationPlace;
          passengerDTO.srcid = this.selectedSingleWay.srcid;
          passengerDTO.destid = this.selectedSingleWay.destid;
          passengerDTO.isPrimary=false;
          this.passengers.push(passengerDTO)
         
        }
      });
     
    }
    this.ticketCount =this.currentCount;
    console.log(this.passangerData)
    console.log(this.passengers)
    //this.reverseSortPassangers();
    // this.passengers.forEach(element => {
    //   this.reversePassengers.push(element)
    // });
    //this.reversePassengers = this.passengers.reverse();


    this.commonService.postUserServiceData("user/flight/bookFlight",this.passengers).subscribe(data=>{
     // this.commonService.postUserServiceData("bookFlight",this.passengers).subscribe(data=>{  
    console.log(data)
      this.responseData = data;
      this.isPaymentSuccessful = true;
      if(this.responseData){
        //this.navigateToHome();
        this.ticketData.emit(this.responseData)
        this.paymentStatus.emit(this.isPaymentSuccessful)

      }
    });
    
    // $(".showtoast").click(function(){
    //   $('.toast').toast('show');
    //   })
  }
  reverseSortPassangers(){
    this.passengers.sort((a,b) => a.isPrimary - b.isPrimary);
    console.log(this.passangersList)
  }
  navigateToHome(){
    //navigate to home after saving passangers into json/db
    console.log("navigate to home")
    this.isNavigate=true;
    this.router.navigate(["user/DashBoard/bookFlight"])
  }

}
