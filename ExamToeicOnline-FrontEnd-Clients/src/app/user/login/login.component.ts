import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthResponseData, UserService } from './../user.service';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm} from '@angular/forms';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
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
  
  isLoading = false;
  error: string = null;

  constructor(
              private userService: UserService,
              private router: Router
              ) {}
 
  ngOnInit(): void {
  }

  onSubmit(formSignIn: NgForm){
    
    const username = formSignIn.value.username;
    const password = formSignIn.value.password;
    var s = new Date(1210981217000).toLocaleDateString("en-US")
    // expected output "8/30/2017"  
    console.log(s);
  //  this.store.dispatch(UserActions.login({username:username, password:password}));
    formSignIn.reset();
  }
}
