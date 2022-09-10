import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.scss']
})
export class AddAirlineComponent implements OnInit {
  airlineform:any;
  result:any={};
  constructor(private commonService:CommonService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
    this.airlineform = this.formBuilder.group({
      airlineName: ['', Validators.required],
      logoURL:['', Validators.required],
      contactNumber:['', Validators.required],
      address:['', Validators.required],
      flightCode:['',Validators.required]
      
    })
    this.resetForm();
  }
  resetForm(){
    this.airlineform.reset();
  }
  onSubmit(){
    debugger;
    console.log(this.airlineform.value);
    this.commonService.postServiceData("admin/flight/saveAirline",this.airlineform.value).subscribe(data=>{
      console.log(data)
      this.result=data;
      if(this.result.global=='success'){
        this.resetForm();
      }
    });
  }

}
