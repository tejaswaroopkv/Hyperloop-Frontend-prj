import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {

  public adminLoginForm: any = [];
  loginCredData:any;
  token:any;
  constructor(private formBuilder: FormBuilder,private commonService:CommonService,private router: Router) { }

  ngOnInit() {
    this.setForm()
    this.commonService.destroySession();
    // this.commonService.getData("adminData").subscribe(data=>{
    //   this.loginCredData = data;
    //   console.log(this.loginCredData)
    // });

    
  }
  setForm() {
    this.adminLoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z]{2,4})")]],
      password: ['', [Validators.required]],

    })
    this.resetForm();

  }
  resetForm() {
    this.adminLoginForm.reset();
  }
  onSigin(){
   // this.commonService.postAuthentication("admin/authenticate",this.adminLoginForm.value).subscribe(data=>{
    this.commonService.postAuthentication("admin/flight/authenticate",this.adminLoginForm.value).subscribe(data=>{  
    this.token=data;
      console.log(this.token.token)
      //this.commonService.setToken(this.token.token);
      this.commonService.setSessionValue('authorization',this.token.token)
      this.commonService.setSessionValue('validUser',true)
      //this.validateUser();
      this.navigateToAdminManagement();
    });


   
  //  console.log(this.loginCredData)
   // console.log(this.adminLoginForm)
   //this.navigateToAdminManagement();
  }
  validateUser(){
    //this.navigateToAdminManagement();
    // if ((this.adminLoginForm.value.emailId == this.loginCredData[0].emailId) && (this.adminLoginForm.value.password == this.loginCredData[0].password)) {
    //   this.commonService.setSessionValue('validUser',true)
    //   this.navigateToAdminManagement();
    // }
  }
  navigateToAdminManagement(){
    // this.router.navigate(['DashBoard/scheduleAirline'])
    this.router.navigate(['DashBoard/addAirline']);
  }
}
