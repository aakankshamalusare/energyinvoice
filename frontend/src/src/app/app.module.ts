import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDataListComponent } from './customer-data-list/customer-data-list.component';
import { CustomerDataService } from './services/customer-data.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { CustormDataFormComponent } from './custorm-data-form/custorm-data-form.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { UploadComponent } from './upload/upload.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { TransactionComponent } from './transaction/transaction.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    CustomerDataListComponent,
    CustormDataFormComponent,
    InvoiceListComponent,
    UploadComponent,
    UpdateInvoiceComponent,
    LoginComponent,
    HomeComponent,
    TransactionComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
    
  
    
  ],
  providers: [CustomerDataService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
