
import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { map } from 'rxjs/operators';
import { UserProfile } from 'src/app/model/userProfile.model';


  
@Injectable({ providedIn: 'root' })
export class ProfileService {

    api:string="";
    httpOptions:any
    
    constructor(private httpClient: HttpClient) {
        this.api ="https://localhost:5001/api/users/update/";
        this.httpOptions={
            headers:new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    updateProfile(userProfile:UserProfile) {  
        var formData = new FormData();
        formData.append("id", userProfile.id);
        formData.append("fullname",userProfile.fullName);
        formData.append("email",userProfile.email);
        formData.append("phone", userProfile.phone);
        formData.append("birthday", userProfile.birthDate.toString());
        formData.append("image", userProfile.image);
       

        return this.httpClient.put<any>(this.api,formData)
        .subscribe(data=>{
            
            console.log(data)
        })
            
           
            
    }
}
 


    