import { ProfileService } from "./../../../user/profile/profile.service";
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
  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.userSub = this.userService.account.subscribe((account) => {
      this.currentAccount = account;
      this.isAuthenticated = !!account;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  onShowProfile() {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
