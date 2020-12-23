import { UserService } from './user.service';
import { User } from "src/app/model/user.model";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService) { }

  currentUser: User;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let url: string = state.url;

    return this.checkLoggedIn(url);
  }

  checkLoggedIn(url: string): boolean {
    if (localStorage.getItem('userData')) {
      return true;
    }
    // Retain the attempted URL for redirection
    this.userService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
