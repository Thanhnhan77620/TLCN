import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import { AuthResponseData, LoginService } from './login.service'
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

  

  constructor(private loginService: LoginService,
              private router: Router) {}
 
  ngOnInit(): void {
  }



  onSubmit(formSignIn: NgForm){
    const username = formSignIn.value.username;
    const password = formSignIn.value.password;

    let authObs: Observable<AuthResponseData>;
    authObs = this.loginService.login(username, password);
    authObs.subscribe(
      resData => {
        this.model=resData
        console.log(resData);
        this.router.navigate(['/register']);
      }
    );
    formSignIn.reset();
  }


}
