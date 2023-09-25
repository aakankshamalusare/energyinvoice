import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDataListComponent } from './customer-data-list/customer-data-list.component';
import { CustormDataFormComponent } from './custorm-data-form/custorm-data-form.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { UploadComponent } from './upload/upload.component';
import { CustomerDataService } from './customer-data.service';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'customers',component:CustomerDataListComponent,
    
  },
  {
    path:'addcustomer',component:CustormDataFormComponent
  },

  {

    path:'invoice/:customerId',component:InvoiceListComponent
  },

  {
    path:'addbulk',component:UploadComponent
  },

  {
    path:'update/:invoiceId',component:UpdateInvoiceComponent
  },

  {
    path:'login',component:LoginComponent
  },

  {
    path:"",redirectTo:"/login",pathMatch:"full"
  },

  {
    path:"home", component:HomeComponent
  },

  /*{

    path:"app",component:AppComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
