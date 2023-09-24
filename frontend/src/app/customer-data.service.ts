import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerData } from './customer-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  


  private baseUrl!:string;
  
  constructor(private http: HttpClient) { 

     this.baseUrl = 'http://localhost:9092/';
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

    return (this.http.put(`${this.baseUrl}update-status/${invoiceId}`,null,{ responseType: 'text' }));
  }

  public getOTP(id:any){
    return (this.http.post(`${this.baseUrl}check-valid/${id}`,null))
  }


}
