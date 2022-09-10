import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CommonGuard implements CanActivate {
  constructor( private loginService:LoginService, private router:Router,private commonService:CommonService ){
  } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.commonService.getSessionValue('validUser') == 'true'){
        return true;
      }else{
        this.router.navigate(['admin/login']);
        return false;
      }
  }
  
}
