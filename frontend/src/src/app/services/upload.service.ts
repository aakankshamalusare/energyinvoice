import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  baseUrl:string = environment.baseUrl;
  
  
  upload(file: any):Observable<any>{


   
     // Create form data
     const formData = new FormData(); 
        
     // Store form name as "file" with file data
     formData.append("file", file, file.name);
       
     // Make http post request over api
     // with formData as req
     return this.http.post(`${this.baseUrl}upload-customer`,formData)
  }
}
