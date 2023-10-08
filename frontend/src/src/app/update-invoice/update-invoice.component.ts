import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
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

//   public updateInvoice(){

//     this.route.paramMap.subscribe((param:any)=>{
 
//        this.customerDataService.updateInvoice(param.get("invoiceId"))
//        .subscribe((response:any)=>{
 
//          this.response=response;
//          const customerId = response.customerId;
//          console.log(customerId);
//          console.log(response);

//          alert('Invoice updated successfully.');
//          this.router.navigate(['/invoice',response.customerId]);
//        })
//      }) 
   

// }


public updateInvoice() {
  this.route.paramMap.subscribe((param: any) => {
    const invoiceId = param.get("invoiceId");
    
    if (!invoiceId) {
      console.error("Invoice ID is missing or undefined.");
      return;
    }

    this.customerDataService.updateInvoice(invoiceId)
      .subscribe(
        (response: any) => {
          const customerId = response.customerId;
          console.log("Customer ID:", customerId);
          console.log("Response:", response);

          alert('Invoice updated successfully.');

          if (customerId) {
            // Navigate to the "Invoice" route if customerId is defined
            this.router.navigate(['/invoice', customerId]);
          } else {
            console.error("Customer ID is missing or undefined.");
          }
        },
        (error: any) => {
          console.error("Error updating invoice:", error);
          // Handle the error, e.g., display an error message to the user
        }
      );
  });
}


}
