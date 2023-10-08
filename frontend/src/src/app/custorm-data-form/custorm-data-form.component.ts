import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../model/customer-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { billingDurationValidator } from '../services/custom-valiadtors';

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




   isValidBillingMonth(dateString: string): boolean {
    const selectedDate = new Date(dateString);
    const day = selectedDate.getDate();
    const currentDate = new Date();

    return day >= 1 && day <= 5 && 
    selectedDate.getFullYear() <= currentDate.getFullYear() &&
    selectedDate.getMonth() <= currentDate.getMonth() 
  }


  isValidBillDueDate(dateString: string, billingDuration: string): boolean {
    
    const selectedDate = new Date(dateString);
    const dueYear = selectedDate.getFullYear();
    const dueMonth = selectedDate.getMonth();

    const billDate = new Date(dateString);
    const year = billDate.getFullYear();
    const month = billDate.getMonth();

    // Check if due date is between 25th and end of the same month and year as billing month
    return dueYear === year && dueMonth === month && selectedDate.getDate() >= 25;
  }
  
  
  
}



  

  
  
  
  


  

