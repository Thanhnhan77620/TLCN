import { User } from "src/app/model/user.model";
import { UserService } from "./user.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { State, getCurrentUser } from "./state/user.reducer";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {}

  currentUser: User;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store
      .select(getCurrentUser)
      .subscribe((currentUser) => (this.currentUser = currentUser));
    if (this.currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
