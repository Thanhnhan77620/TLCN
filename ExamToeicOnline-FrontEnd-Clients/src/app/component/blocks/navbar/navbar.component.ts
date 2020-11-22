import { Account } from './../../../model/account.model';
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
  currentAccount: Account
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSub = this.userService.account.subscribe(account => {
      this.currentAccount = account;
      this.isAuthenticated = !!account;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
