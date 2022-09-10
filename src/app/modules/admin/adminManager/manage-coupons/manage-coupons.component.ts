import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.scss']
})
export class ManageCouponsComponent implements OnInit {
  manageCouponForm:any;
  couponData:any=[];
  coupons:any=[];
  couponPostData:any=[];
  constructor(private commonService:CommonService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
    //this.loadCouponData();
  }
  setForm() {
    this.manageCouponForm = this.formBuilder.group({
      couponCode: ['', Validators.required],
      price: ['', Validators.required]
     
    })
    this.resetForm();
  }
  resetForm(){
    this.manageCouponForm.reset();
  }
  // loadCouponData(){
  //   this.commonService.getData("admin/couponData").subscribe(data=>{
  //     this.couponData=data;
  //     this.couponData.forEach(element => {
  //       this.coupons.push(element);
  //     });
  //   })
  // }
  onSubmit(){
   // let id = Math.floor((Math.random() * 100) + 1);
    //this.couponPostData.id=id
    this.couponPostData=this.manageCouponForm.value;
    console.log(this.couponPostData);
    //this.commonService.postData("couponData",this.couponPostData).subscribe(data=>{
      this.commonService.postServiceData("admin/flight/saveCoupon",this.couponPostData).subscribe(data=>{
      console.log(data)
      this.commonService.result=data;
     });
    this.resetForm();
  }
  // onDataRecieved(){
  //   if(this.commonService.result.global=='success'){
  //     this.resetForm();
  //   }
  // }

}
