import { Router } from '@angular/router';
import { AuthResponseData, UserService } from './../user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastService } from 'ng-uikit-pro-standard'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {
    username: "ngan",
    password: "12345678"
  };

  isLoading = false;
  error: string = null;
  returnUrl: string;
  options = { opacity: 1 };
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.userService.redirectUrl;
  }
  showError() {
    this.toastService.error('Login failed!', 'Info message', this.options);
  }
  showSuccess() {
    this.toastService.success('Login success!', 'Info message', this.options);
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
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.showSuccess();
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.showError();
      }
    );

    form.reset();
  }
}
