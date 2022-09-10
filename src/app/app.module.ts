import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { HeaderComponent } from './root-components/header/header.component';
import { FooterComponent } from './root-components/footer/footer.component';
import { ContactUsComponent } from './root-components/contact-us/contact-us.component';
import { AboutComponent } from './root-components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonService } from './services/common.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ContactUsComponent, AboutComponent],
  imports: [BrowserModule,AppRoutingModule,AdminModule,UsersModule,FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule ,
    MatAutocompleteModule,
    MatTabsModule
  ],
    providers:[CommonService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
