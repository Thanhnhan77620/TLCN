import { UserService } from './../../../user/user.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe, observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isLogin$: Observable<boolean>;
  currentUser: User = null;
  currentUser$: Observable<User>;
  @Input() isLogin: boolean;
  constructor(  private router: Router,
                private userService: UserService) { }


  ngOnInit(): void {    
    this.loggedIn();
  }

  loggedIn(){
    this.userService.loggedIn().subscribe(
      (loggedIn) => {
        this.isLogin = loggedIn;
        console.log(this.isLogin)
      }
    );
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  onRegister(){
    this.router.navigate(['/auth/register']),
    this.isLogin = false;
  }

}
