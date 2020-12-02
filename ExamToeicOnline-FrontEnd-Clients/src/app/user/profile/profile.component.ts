import { observable, Observable, Subscriber} from 'rxjs';
import { NgForm} from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/model/user.model';

import { ProfileService } from './profile.service'
import { Guid } from 'guid-typescript';
import { UserProfile } from './../../model/userProfile.model';



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit  {


    constructor(private profileService: ProfileService){}
    ngOnInit(): void {

    }
    userProfile:UserProfile   
    myImage:Observable<any>;

    file:string;

    // id=Guid.parse("f255c9a7-7185-4a5d-b22d-3c3c9351e399");  
    onSave(formProFile: NgForm){ 
   
        // this.userProfile.id="f255c9a7-7185-4a5d-b22d-3c3c9351e399";
        // this.userProfile.fullName=formProFile.value.fullName;
        // this.userProfile.birthDate=formProFile.value.birthDate;
        // this.userProfile.phone=formProFile.value.phoneNumber;
        // this.userProfile.email=formProFile.value.email;
        // this.userProfile.image=this.file;
        this.userProfile={  
            id:"543fead6-46b7-4eac-91df-582f2cbec31e",
            fullName:formProFile.value.fullName,
            birthDate: formProFile.value.birthDate,
            phone: formProFile.value.phoneNumber,
            email: formProFile.value.email,
            image: this.file
        } 
        console.log(this.userProfile)
        this.profileService.updateProfile(this.userProfile)
   
       
    }

    onChange($event:Event){
        const file=($event.target as HTMLInputElement).files[0]; 
        this.ConvertToBase64(file);
       
        //console.log(file);
     
     

     
    }
    ConvertToBase64(file:File) {
        this.myImage=new Observable((subscriber:Subscriber<any>)=>{
            this.readFile(file, subscriber);
            
        });
       
        this.myImage.subscribe((d)=>{
            // this.userProfile.image=d.toString();
            // console.log(d.replace("data:image/jpeg;base64,",""))
            this.file=d.replace("data:image/jpeg;base64,","")
            // console.log(this.file)

        // })
        // //console.log(this.myImage.subscribe())
        // this.userProfile.image=this.myImage.toString();
   
    })
}


    readFile(file:File, subscriber:Subscriber<any>){
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            subscriber.next(fileReader.result);
            subscriber.complete();
           

        };
        fileReader.onerror=(error)=>{
            subscriber.error(error);
        }
    }
}


