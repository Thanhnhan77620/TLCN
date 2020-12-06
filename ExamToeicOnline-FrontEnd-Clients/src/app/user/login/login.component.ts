import { Router } from '@angular/router';
import { AuthResponseData, UserService } from './../user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;


    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.userService.login(username, password);

    authObs.subscribe(
      resData => {
        this.router.navigate(['/home']);
      },
      error => {
        alert(error);
      }
    );

    form.reset();
  }
}
