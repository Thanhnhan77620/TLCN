import { observable, Observable, Subscriber} from 'rxjs';
import { NgForm} from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from './profile.service'
import { UserProfile } from "./../../model/userProfile.model";

<<<<<<< HEAD
import { ProfileService } from './profile.service';
=======

>>>>>>> master

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit  {


<<<<<<< HEAD
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  defaultImg = "../../../assets/image/defautl.png"

  constructor(private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute) { }
=======
    constructor(private profileService: ProfileService){}
    ngOnInit(): void {
>>>>>>> master

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
            id:"B1B71AC8-AB3B-4897-A6AF-4A64B6F9A731",
            fullName:formProFile.value.fullName,
            birthDate: formProFile.value.birthDate,
            phone: formProFile.value.phoneNumber,
            email: formProFile.value.email,
            image: this.file
        } 
        console.log(this.userProfile)
        // this.profileService.updateProfile(this.userProfile)
   
       
    }

    onChange($event:Event){
        const file=($event.target as HTMLInputElement).files[0]; 
        this.ConvertToBase64(file);
       
        //console.log(file);
     
     

     
    }
<<<<<<< HEAD
    console.log(this.userProfile)
    this.profileService.updateProfile(this.userProfile);
  }

  onFileSelected(event) {
    // var n = this.currentUser.id;
    // const file = event.target.files[0];
    // const filePath = `avatar/${n}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`avatar/${n}`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //         console.log(this.fb);
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       console.log(url);
    //     }
    //   });
=======
    ConvertToBase64(file:File) {
        this.myImage=new Observable((subscriber:Subscriber<any>)=>{
            this.readFile(file, subscriber);
            
        });
        this.myImage.subscribe((d)=>{
            // this.userProfile.image=d.toString();
            // console.log(d.replace("data:image/jpeg;base64,",""))
            this.file=d.replace("data:image/jpeg;base64,","")
            // console.log(this.file)
>>>>>>> master

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
