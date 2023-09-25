import { Component, OnInit } from '@angular/core';
import { Payment } from '../payment';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  payments!:Payment[];
  constructor(private customerDataService:CustomerDataService,
    private route:ActivatedRoute) {

   }

   title!:string;

  ngOnInit(): void {
    this.title ="TRANSACTION DETAILS";
    this.getHistory();
  }


  public getHistory(){

    this.route.paramMap.subscribe((param:any)=>{
 
       this.customerDataService.getHistory(param.get("customerId"))
       .subscribe((response:any)=>{
 
         this.payments=response;
         console.log(this.payments);
       })
     })
   }

}
