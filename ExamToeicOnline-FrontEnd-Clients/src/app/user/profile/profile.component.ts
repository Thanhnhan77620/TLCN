import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  userProfile: User;
  myImage: Observable<any>;
  file: string;
  currentUser: User = {
    id: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    birthDate: null,
    image: null
  };

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  defaultImg = "../../../assets/image/defautl.png"

  constructor(private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe(
      (data) => {
        this.currentUser = data;
        console.log(this.currentUser);
      },
      (error) => console.log(error)
    );
  }

  onSave(formProFile: NgForm) {

    this.userProfile = {
      id: this.currentUser.id,
      fullname: formProFile.value.fullName,
      birthDate: formProFile.value.birthDate ? formProFile.value.birthDate : new Date(),
      phoneNumber: formProFile.value.phoneNumber,
      email: formProFile.value.email,
      image: this.fb
    }
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

  }
}

