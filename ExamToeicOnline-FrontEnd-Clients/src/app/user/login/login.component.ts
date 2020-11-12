import { map, tap } from 'rxjs/operators';
import { State } from './../state/user.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';


import * as UserActions from '../state/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  model: any = {
    username: "Nhan",
    password: "12345678"
  };


  constructor(
              private store: Store<State>,
              ) {}
 
  ngOnInit(): void {
  }

  onSubmit(formSignIn: NgForm){
    
    const username = formSignIn.value.username;
    const password = formSignIn.value.password;

    this.store.dispatch(UserActions.login({username:username, password:password}));
   

    formSignIn.reset();
  }


}
