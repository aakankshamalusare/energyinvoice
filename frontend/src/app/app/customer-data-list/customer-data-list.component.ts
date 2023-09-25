import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../customer-data';
import { CustomerDataService } from '../customer-data.service';
import { Invoice } from '../invoice';

@Component({
  selector: 'app-customer-data-list',
  templateUrl: './customer-data-list.component.html',
  styleUrls: ['./customer-data-list.component.css']
})
export class CustomerDataListComponent implements OnInit {

  customers!:CustomerData[];
  invoices !: Invoice[];
  title!:string;

  constructor(private customerDataService:CustomerDataService) { }

  ngOnInit(): void {

    this.title ="CUSTOMER DETAILS"
    this.getAll()
  }


  public getAll(){

    this.customerDataService.getAll().subscribe((data: CustomerData[]) =>{

      this.customers = data;
    });

  }



  

}
