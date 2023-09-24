import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  response!:string;
  constructor(private customerDataService:CustomerDataService,
    private route:ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.updateInvoice();
  }

  public updateInvoice(){

    this.route.paramMap.subscribe((param:any)=>{
 
       this.customerDataService.updateInvoice(param.get("invoiceId"))
       .subscribe((response:any)=>{
 
         this.response=response;
         const customerId = response.customerId;
         console.log(customerId);
         console.log(response);

         alert('Invoice updated successfully.');
         this.router.navigate(['/invoice',response.customerId]);
       })
     }) 
   

}

}
