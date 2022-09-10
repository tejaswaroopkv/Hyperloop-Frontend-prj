import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private data: { emailId: string, validUser: boolean } = {
    emailId: "",
    validUser: false
  }

  public set emailId(emailId: string) {
    this.data.emailId = emailId;
  }

  public set validUser(validUser: boolean) {
    this.data.validUser = validUser;
  }

  public get user() {
    return this.data;
  }
}
