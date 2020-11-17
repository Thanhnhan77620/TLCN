import { map } from 'rxjs/operators';
import { UserService } from './../user.service';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm} from '@angular/forms';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  model: any = {
    username: "nhan",
    password: "12345678"
  };
  
  token: string;
  user: any;
  @Output() loggedIn: EventEmitter<boolean>;

  constructor(
              private userService: UserService
              ) {}
 
  ngOnInit(): void {
  }

  onSubmit(formSignIn: NgForm){
    
    const username = formSignIn.value.username;
    const password = formSignIn.value.password;
    this.userService.login(username, password).subscribe(
     () => console.log('Login Success'),
     (error) => {
       console.log(error)
     }
    )
    formSignIn.reset();
  }

  

}
