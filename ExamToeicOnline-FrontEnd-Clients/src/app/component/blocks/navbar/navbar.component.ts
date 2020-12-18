import { ActivatedRoute } from '@angular/router';
import { DethiService } from 'src/app/dethi/dethi.service';
import { Router } from '@angular/router';
import { Account } from "./../../../model/account.model";
import { UserService } from "./../../../user/user.service";

import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  currentAccount: Account;
  userName:string;
  constructor(
    private userService: UserService,
    private router: Router,

  ) { }


  ngOnInit() {
    this.userSub = this.userService.account.subscribe((account) => {
      this.currentAccount = account;
      this.isAuthenticated = !!account;
    });
   this.userName=localStorage.getItem('userName');

  }

  onLogout() {
    this.userService.logout();
  }

  onShowProfile() { }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
