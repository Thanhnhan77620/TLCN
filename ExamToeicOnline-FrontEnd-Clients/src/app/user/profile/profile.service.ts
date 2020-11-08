
import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';


  
@Injectable({ providedIn: 'root' })
export class ProfileService {

    api:string="";
    httpOptions:any
    
    constructor(private httpClient: HttpClient) {
        this.api ="https://localhost:44300/api/users/";
        this.httpOptions={
            headers:new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    

    updateProfile(id: Guid) {  
        return this.httpClient.put<any>(this.api+id,{id:id})
           .toPromise()
           .then(response =>{console.log(response)});
            
    }
}
 


    