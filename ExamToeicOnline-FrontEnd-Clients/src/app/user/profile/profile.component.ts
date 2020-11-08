// import { observable, Observable, Subscriber} from 'rxjs';

// import { NgForm} from '@angular/forms';
// import { Component, OnInit, HostListener } from '@angular/core';
// import { User } from 'src/app/model/user.model';
// import { ProfileService } from './profile.service'
// import { Guid } from 'guid-typescript';


// @Component({
//     selector: 'app-profile',
//     templateUrl: './profile.component.html'
// })

// export class ProfileComponent implements OnInit  {


//     constructor(private profileService: ProfileService){}
//     ngOnInit(): void {

//     }
  
//     user: User
//     myImage:Observable<any>;
//     id=Guid.parse("f255c9a7-7185-4a5d-b22d-3c3c9351e399");  
//     onSave(formProFile: NgForm){ 
//         this.user={     
//             Id: Guid.parse("f255c9a7-7185-4a5d-b22d-3c3c9351e399"),    
//             fullName:formProFile.value.fullName,
//             birthDate: formProFile.value.birthDate,
//             phoneNumber: formProFile.value.phoneNumber,
//             email: formProFile.value.email,
//             image: formProFile.value.image
//         } 

//         this.profileService.updateProfile(this.id)
        
        
        
      
       
//     }

//     onChange($event:Event){
//         const file=($event.target as HTMLInputElement).files[0]; 
//         this.ConvertToBase64(file);
//         // console.log(file);
       
       
//     }
//     ConvertToBase64(file:File) {
//         this.myImage=new Observable((subscriber:Subscriber<any>)=>{
//             this.readFile(file, subscriber);
//         });
//         // this.myImage.subscribe((d)=>{
//         //     console.log(d); 
//         // })
      
//     }

//     readFile(file:File, subscriber:Subscriber<any>){
//         const fileReader=new FileReader();
//         fileReader.readAsDataURL(file);
//         fileReader.onload=()=>{
//             subscriber.next(fileReader.result);
//             subscriber.complete();

//         };
//         fileReader.onerror=(error)=>{
//             subscriber.error(error);
//         }
//     }
// }

