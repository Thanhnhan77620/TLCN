import { UserService } from "./../user.service";
import { Observable, Subscriber } from "rxjs";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Component, OnInit, HostListener, OnChanges, SimpleChanges, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { User } from "src/app/model/user.model";

import { ProfileService } from "./profile.service";
import { Guid } from "guid-typescript";
import { UserProfile } from "./../../model/userProfile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() profileForm: FormGroup;
  userProfile: UserProfile = null;
  myImage: Observable<any>;
  currentUser: User;

  isChanged: boolean = false;

  @ViewChild(NgForm) formProfile: NgForm;

  file: string;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes" + changes)
  }
  ngAfterViewInit(): void {
    console.log(this.formProfile);
    console.log(this.formProfile.touched);
    console.log(this.formProfile.dirty)
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userData: {
      username: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    this.userService.getUser(userData.userId).subscribe(
      (data) => {
        this.currentUser = data;
        console.log(this.currentUser);
      },
      (error) => console.log(error)
    );
  }

  onSaveData() {
      
  }
}
