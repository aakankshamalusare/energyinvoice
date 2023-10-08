import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../model/customer-data';
import { CustomerDataService } from '../services/customer-data.service';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../model/invoice';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {


  customerId:number = 5;
  invoices!:Invoice[];
  

  constructor(private customerDataService:CustomerDataService,
    private route:ActivatedRoute) { }


  title!:string;

  ngOnInit(): void {

    this.title ="INVOICE DETAILS"

   this.getInvoice();
    
  }

  
  public getInvoice(){

   this.route.paramMap.subscribe((param:any)=>{

      this.customerDataService.getInvoice(param.get("customerId"))
      .subscribe((response:any)=>{

        this.invoices=response;
        console.log(this.invoices);
      })
    })
  }




 

}
