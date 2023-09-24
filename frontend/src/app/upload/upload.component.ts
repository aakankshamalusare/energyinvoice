import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http:HttpClient) { }

  
  ngOnInit(): void {
  }



onFileSelected(event:any):void{

  const file:File = event.target.files[0];
  if(file){
    this.uploadCSVFile(file);
  }
}

uploadCSVFile(file: File): void {
  // Validate file extension and content type
  if (file.name.endsWith('.csv') && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel')) {

    this.errorMessage = ''; // Clear any previous error message
    this.successMessage = ''; // Clear any previous success message

    const formData = new FormData();
    formData.append('file', file);

    //  backend API
    const backendUrl = 'http://localhost:9092/upload-customer';

    this.http.post(backendUrl, formData, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          console.log('File upload success:', response);
          // Handle the text-based response as needed
           // Set the success message
           const jsonResponse = JSON.parse(response);

           const validValue = jsonResponse.Valid;
           this.successMessage = 'File uploaded successfully.';
        },
        (error: any) => {
          console.error('File upload error:', error);
          // Handle any errors that occurred during the file upload
          this.errorMessage = 'An error occurred while uploading the file.';
        }

        
      );

      
  } else {
    // Display an error message to the user indicating an invalid file format
    this.errorMessage = 'Invalid file format. Please select a CSV file.';
    console.log(this.errorMessage);
  }
}






/*
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file



  // On file Select
  onChange(event:any) {
    this.file = event.target.files[0];
   }


   onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.uploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable 
            }
        }
    );
}*/


  onSubmit(){


  }

}
