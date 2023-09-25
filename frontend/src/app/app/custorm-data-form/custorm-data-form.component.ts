import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../customer-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../customer-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { billingDurationValidator } from '../custom-valiadtors';

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
  userForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService:CustomerDataService,
    private formBuilder:FormBuilder
    ) { 

      this.userForm = this.formBuilder.group({
        billingDuration:[
          this.customer.billingDuration||null,
          Validators.required,
         
        ],
      });

     
    }


    title!:string;

    ngOnInit(): void {

      this.title="CUSTOMER DETAILS"
    }


  onSubmit(){

      this.customerService.add(this.customer)
    .subscribe((response:any)=>{
    
      const message = response.hasOwnProperty('Message') ? response.Message : '';
     this.successMessage = message;

      const error = response.hasOwnProperty('Error') ? response.Error : '';
      this.errorMessage = error;

      if (message !== '') {
        alert(message);
        
      this.router.navigate(['/customers']);
      }

      if (error !== '') {
        alert(error);
      }


    })
     
  }

  gotoCustomerList(){

    this.router.navigate(['/customers'])
  }

  // Custom validator for billing duration (1-5)
   validateBillingDuration(value:string) {
   const selectedDate = new Date(value);

    if (selectedDate.getDate() < 1 || selectedDate.getDate() > 5) {
      console.log("in IF---------");
      this.userForm.controls['billingDuration'].setErrors({ 'invalidBillingDuration': true });
      
   } else {
    console.log("in else---------");
     this.userForm.controls['billingDuration'].setErrors(null);
     //this.userForm.get('billingDuration').setErrors({ 'invalidBillingDuration': true });
     }
   }

   validateBillDueDate(value: string) {
    const selectedDate = new Date(value);

     if (selectedDate.getDate() < 27 || selectedDate.getDate() > 30) {
      this.userForm.controls['billDueDate'].setErrors({ 'invalidBillDueDate': true });
     } else {
         this.userForm.controls['billDueDate'].setErrors(null);
     }
   }

  
}



  

  
  
  
  


  

