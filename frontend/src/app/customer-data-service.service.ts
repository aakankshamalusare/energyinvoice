import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CustomerData } from './customer-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataServiceService {

  private baseUrl!:string;
  
  constructor(private http: HttpClient) { 

     this.baseUrl = 'http://localhost:9092/get-customers';
  }

  public getAll():Observable<CustomerData[]>{

    return this.http.get<CustomerData[]>(this.baseUrl);
  }

  public add(customer:CustomerData){

    return this.http.post<CustomerData>(this.baseUrl,customer);
  }



}
