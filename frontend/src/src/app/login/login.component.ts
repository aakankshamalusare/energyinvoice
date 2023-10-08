import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import { Router } from '@angular/router';
import { otp } from '../model/otp';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 obj:any=<otp>{};
 title!:string;
 invalidOTP:boolean=false;

  constructor(private service:CustomerDataService,private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {

    title:"Login"
    document.body.className='bg_background';
  }


  login(otp:any,employeeId:string){
    let userotp=+otp; 
    let useremployeeId=+employeeId;
    console.log(this.obj.otp.employeeId) 
    
    if(userotp==this.obj.otp.otp && useremployeeId===this.obj.otp.employeeId){
      sessionStorage.setItem("employeeId)",this.obj.otp.employeeId);
      this.authService.setLoggedInStatus(true);
      this.router.navigate(['/home']);
    }else{

      console.log("Invalid OTP");
      this.invalidOTP=true;

    }
    
}

otp(id:any){
 
  let userid = +id;
this.service.getOTP(userid).subscribe(
  (response: any) => {
    if (response && response.otp && response.otp.otp) {
      this.obj = response;
      console.log(this.obj.otp.otp);
      alert(`Your OTP :${this.obj.otp.otp}`);
    } 
  },
  (error) => {
    
    if (error.status === 400 && error.error && error.error.Message === "Invalid User") {
      console.log("Invalid User");
      alert("Invalid User");
    }
  }
);


}
}
