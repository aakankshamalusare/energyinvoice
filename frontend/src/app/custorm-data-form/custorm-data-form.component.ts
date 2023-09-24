import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../customer-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../customer-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custorm-data-form',
  templateUrl: './custorm-data-form.component.html',
  styleUrls: ['./custorm-data-form.component.css']
})
export class CustormDataFormComponent implements OnInit {


  customer: CustomerData ={
    customerId: 0,
    name: '',
    email: '',
    telephoneNumber: '',
    billingDuration:new Date(),
    unitConsumption: 0,
    billDueDate:new Date() 
  }
 
  successMessage!: string;
  errorMessage!:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService:CustomerDataService,
   
    ) { 

     
    }


    ngOnInit(): void {
    }


  onSubmit(){

      this.customerService.add(this.customer)
    .subscribe((response:any)=>{
    
      const message = response.Message; // Access the "Message" property
      this.successMessage = message; // Assign the message to a variable or property

      const error = response.Error;
      this.errorMessage = error;

      

     // this.router.navigate(['/customers']);
    })

    

   
     
  }

  gotoCustomerList(){

    this.router.navigate(['/customers'])
  }


  
  // userForm:any;

  // // Custom validator for billing duration (1-5)
  // validateBillingDuration(value:string) {
  //   const selectedDate = new Date(value);
  
  //   if (selectedDate.getDate() < 1 || selectedDate.getDate() > 5) {
  //     this.userForm.controls['billingDuration'].setErrors({ 'invalidBillingDuration': true });
  //   } else {
  //     this.userForm.controls['billingDuration'].setErrors(null);
  //   }
  // }

  //  validateBillDueDate(value: string) {
  //   const selectedDate = new Date(value);

  //   if (selectedDate.getDate() < 27 || selectedDate.getDate() > 30) {
  //     this.userForm.controls['billDueDate'].setErrors({ 'invalidBillDueDate': true });
  //   } else {
  //     this.userForm.controls['billDueDate'].setErrors(null);
  //   }
  // }



 















  // getMinBillingDate(): string {
  //   const today = new Date();
  //   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  //   return firstDayOfMonth.toISOString().split('T')[0];
  // }

  // getMaxBillingDate(): string {
  //   const today = new Date();
  //   const fifthDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 5);
  //   return fifthDayOfMonth.toISOString().split('T')[0];
  // }

  // getMinDueDate(): string {
  //   if (this.billingDate) {
  //     const lastDayOfMonth = new Date(
  //       this.billingDate.getFullYear(),
  //       this.billingDate.getMonth(),
  //       1
  //     );
  //     return lastDayOfMonth.toISOString().split('T')[0];
  //   } else {
  //     // Default to the current date if billingDate is not set yet
  //     return this.getMinBillingDate();
  //   }
  // }

  // getMaxDueDate(): string {
  //   if (this.billingDate) {
  //     const lastDayOfMonth = new Date(
  //       this.billingDate.getFullYear(),
  //       this.billingDate.getMonth(),
  //       31
  //     );
  //     return lastDayOfMonth.toISOString().split('T')[0];
  //   } else {
  //     // Default to the current date if billingDate is not set yet
  //     return this.getMinBillingDate();
  //   }}
}



  

  
  
  
  


  

