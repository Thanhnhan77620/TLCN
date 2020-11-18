import { User } from 'src/app/model/user.model';
import { UserService } from './../../../user/user.service';


import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isAuthenticated = false;
  private userSub: Subscription;
  currentUser: User
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated)
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
