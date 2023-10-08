import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerData } from '../model/customer-data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  


  baseUrl:string = environment.baseUrl;
  
  constructor(private http: HttpClient) { 

  }

  public getAll():Observable<CustomerData[]>{

    return this.http.get<CustomerData[]>(`${this.baseUrl}get-customers`);
  }

  public add(customer:CustomerData){

    return this.http.post<CustomerData>(`${this.baseUrl}add-customer`,customer);
  }


  public getInvoice(customerId:number){

    return (this.http.get(`${this.baseUrl}get-custInvoices/${customerId}`));
  }

  public updateInvoice(invoiceId:number){

    return (this.http.put(`${this.baseUrl}update-status/${invoiceId}`,null));
  }

  public getOTP(id:any){
    return (this.http.post(`${this.baseUrl}check-valid/${id}`,null))
  }


  public getHistory(customerId:number){

    return (this.http.get(`${this.baseUrl}get-history/${customerId}`));
  }


}
