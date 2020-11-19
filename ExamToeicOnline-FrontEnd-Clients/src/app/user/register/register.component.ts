import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  password: string;
  confirmPassword: string;
  fullname: string;
  email: string;



  ngOnInit(): void {
  }

  onRegister(form: NgForm){
    this.router.navigate(['/register'])
  }
}
