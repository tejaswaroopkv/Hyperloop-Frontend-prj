import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
  }
  logout(){
    this.commonService.destroySession();
    this.commonService.setSessionValue('validUser',false)
    this.router.navigate(["admin/login"]);

  }

}
