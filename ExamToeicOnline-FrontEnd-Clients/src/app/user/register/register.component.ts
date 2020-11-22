import { Account } from './../../model/account.model';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { UserService } from './../user.service';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, Observable } from 'rxjs';


function passwordMatcher(c: AbstractControl):{[key:string]: boolean} | null{
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');
  if(passwordControl.pristine || confirmPasswordControl.pristine){
    return null;
  }

  if(passwordControl.value === confirmPasswordControl.value){
    return null;
  }
  return {'match': true}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  message: string;
  error: string;
  authObs: Observable<User>;
  isRememberLogin: boolean = false;
  private validationMessage = {
    required: 'Please enter your email address.',
    match: "Confirm Password don't match with Password"
  };

  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService) { 
            

  }
  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname:  ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['',[Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },{validator: passwordMatcher}),
      rememberLogin: false
    });

    const passwordGroupControl = this.registerForm.get('passwordGroup');
    passwordGroupControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(passwordGroupControl)
    );
  }

  onRegister(){
    
    let fullname = this.registerForm.get('fullname').value;
    let email = this.registerForm.get('email').value;
    let password = this.registerForm.get('passwordGroup.password').value;
    this.isRememberLogin = this.registerForm.get('rememberLogin').value;
    
    this.userService.signup(fullname, email, password).subscribe(
      (resData: any) => {
        if(this.isRememberLogin){   
          this.userService.login(resData.accounts[0].username, password).subscribe(
            res => {
              this.router.navigate(['/home']);
            },
            errorMessage => {
              this.error = errorMessage;
              console.log(this.error)
            }
          );;
        }
        this.router.navigate(['/home']);
      },
      errorMessage => {
        this.error = errorMessage;
        alert(this.error);
      }
    );
    this.registerForm.reset();
    
  }
  setMessage(c: AbstractControl): void{
    this.message = '';
    if((c.touched || c.dirty) && c.errors){
      this.message = Object.keys(c.errors).map(   //select errors collection
        key =>this.validationMessage[key]).join(' '); //
    }
  }

  setAutoLogin(c: AbstractControl):void{

  }
}