
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
  
@Injectable({ providedIn: 'root' })
export class RegisterService {

    api:string="";

    
    constructor(private httpClient: HttpClient) {
        this.api ="https://localhost:5001/api/users/";
 
    }
    register(fullName:string, email:string, passWord:string) {  
        var formData = new FormData();     
        formData.append("fullName",fullName);
        formData.append("email",email);
        formData.append("passWord",passWord);
        return this.httpClient.post<any>(this.api,formData)
        .subscribe(data=>{            
            console.log(data);
        })
      
    }
}
 


    