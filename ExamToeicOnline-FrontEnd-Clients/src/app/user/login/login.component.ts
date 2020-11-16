import { map } from 'rxjs/operators';
import { UserService } from './../user.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
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

  constructor(
              private userService: UserService
              ) {}
 
  ngOnInit(): void {
  }

  onSubmit(formSignIn: NgForm){
    
    const username = formSignIn.value.username;
    const password = formSignIn.value.password;
    
    this.userService.login(username, password).pipe(
      map((user) => {
        this.user = user
        this.token = this.user.value.token
        console.log(this.token)
        var decodedHeader = jwt_decode(this.token);
        console.log(decodedHeader);
       
      })
    ).subscribe();   

    formSignIn.reset();
  }


}
