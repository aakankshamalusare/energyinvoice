import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../customer-data.service';
import { Router } from '@angular/router';
import { otp } from '../otp';

import { AuthService } from '../auth.service';

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
 
  let userid=+id;
  this.service.getOTP(userid).subscribe((response:any)=>{
      this.obj=response;
      console.log(this.obj.otp.otp);
      alert(this.obj.otp.otp);
  })
 
  

}


}
