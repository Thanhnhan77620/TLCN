import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() model: any = {
    username: String,
    password: String
  };

  

  constructor(
    private loginService: LoginService
  ) {}
 
  ngOnInit(): void {
  }



  onSubmit(){
    console.log(this.model);
  }
}
