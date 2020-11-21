
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './register.service';
import { NgForm, FormGroup, FormBuilder, Validators  } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister:FormGroup
  constructor(private router: Router,
              private route: ActivatedRoute,
              private registerService: RegisterService,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.formRegister=this.formBuilder.group({
      fullName: '',
      email: ['', [Validators.email]],
      passWord:['',[Validators.minLength(8)]],
      confirmPassword:''
    })  
  }
  // onRegister(formRegister:NgForm){
  //   // this.router.navigate(['/register'])
  //   if(this.registerService.register(formRegister.value.fullName,formRegister.value.email,formRegister.value.passWord)){
  //     this.router.navigate(['auth/login'])
  //   }
    
    
  // }
  get f() { return this.formRegister.controls; }
  onRegister(){
    if (this.formRegister.invalid) {
      alert('Register Fail')
    }
    else{
      this.registerService.register(this.formRegister.value.fullName,this.formRegister.value.email,this.formRegister.value.passWord)
    } 
    console.log(this.formRegister.controls)
  }
  message ='';
  checkConfirmPassword(){
   
    if(this.formRegister.value.passWord!=this.formRegister.value.confirmPassword){
      this.message="Password does not match";
    }else
    {
      this.message='';
    }
    
  }
}