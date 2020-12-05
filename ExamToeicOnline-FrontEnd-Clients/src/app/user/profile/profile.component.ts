import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { observable, Observable, Subscriber } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
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
  currentUser: User;

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
      birthDate: formProFile.value.birthDate ? formProFile.value.birthDate : null,
      phoneNumber: formProFile.value.phoneNumber,
      email: formProFile.value.email,
      image: this.file
    }
    console.log(this.userProfile)
    this.profileService.updateProfile(this.userProfile)


  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.ConvertToBase64(file);
  }
  ConvertToBase64(file: File) {
    this.myImage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);

    });
    this.myImage.subscribe((d) => {
      this.file = d.replace("data:image/jpeg;base64,", "")
    })
  }


  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();


    };
    fileReader.onerror = (error) => {
      subscriber.error(error);
    }
  }
}

