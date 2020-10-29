import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) {}
  username: string
  password: string
  ngOnInit(): void {
  }
  onSubmit(formSingIn){
    this.username=formSingIn.value.username;
    this.password=formSingIn.value.password;
    // console.log(this.username);
    // console.log(this.password);
    // console.log(formSingIn);
    this.loginService.login()
    .then(data=>{
      this.username=data[0].username;
      console.log(data[0])
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
