import { observable, Observable, Subscriber} from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { Component, OnInit, Output,HostListener ,EventEmitter} from '@angular/core';
import { ProfileService } from './profile.service'
import { UserProfile } from "./../../model/userProfile.model";
import { HttpEventType, HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Account } from './../../model/account.model';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { UserUpdate } from './../../model/userUpdate.model';
import { ViewEncapsulation } from '@angular/core';
import {ToastService} from 'ng-uikit-pro-standard'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit  {
  
    constructor(
        private userService: UserService,
        private router: Router,
        private toastService:ToastService
        ){ }
  
    userProfile:UserProfile;
    key=1;
    ngOnInit(): void {
      
        this.userProfile = {
            id:localStorage.getItem('UserId'),
            email:localStorage.getItem('email'),
            fullName:localStorage.getItem('fullName'),
            phone:(localStorage.getItem('phone')!='null')?localStorage.getItem('phone'):"",
            image:localStorage.getItem('image'),
            birthDate:new Date(localStorage.getItem('birthday'))
            
        }
        
    }

    oldPassWord:'';
    newPassWord:'';
    ConfirmNewPassWord:'';
    options = { opacity: 1 };
    onChangePassword(formProFile:NgForm){
        this.userService.changePassword(localStorage.getItem('userName'),formProFile.value.oldPassWord,formProFile.value.newPassWord)
        .subscribe(
            result => this.showSuccess(),
            error => {
                this.toastService.error(error.message, 'Info message',this.options);
            }
            
        );
        this.oldPassWord='';
        this.newPassWord='';
        this.ConfirmNewPassWord='';

    }
    showSuccess() {
        this.toastService.success('Upload information success!', 'Info message',this.options);
    }
    showError() {
        this.toastService.error('Old PassWord Incorrect!', 'Info message',this.options);
    }
    myImage:Observable<any>;
    userUpdate:UserUpdate
    file:File;
    
    routerChangePassword(){
        this.key=2;

    }
    routerChangeProfile(){
        this.key=1;
    }
    onSave(formProFile: NgForm) {
        this.userUpdate = {
            id: localStorage.getItem('UserId'),
            fullName: formProFile.value.fullName,
            birthDate: formProFile.value.birthDate,
            phone: formProFile.value.phoneNumber,
            email: formProFile.value.email,
            image: this.file
        } 
    
       this.userService.updateProfile(this.userUpdate);
       this.showSuccess();

    }

    onChange($event: Event) {
        this.file = ($event.target as HTMLInputElement).files[0];
        this.ConvertToBase64(this.file);
       
    }
    ConvertToBase64(file: File) {
        if(file!=null){
            this.myImage = new Observable((subscriber: Subscriber<any>) => {
                this.readFile(file, subscriber);
            });
        }
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
