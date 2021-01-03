import { NavbarTestComponent } from './navbar-test.component';
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitGuardGuard implements CanDeactivate<NavbarTestComponent> {
  canDeactivate(
    component: NavbarTestComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('listAnswerSelected') && !component.isSubmit) {
      return confirm(`Bạn có chắc thoát khỏi bài thì không? Kết quả bài thi sẽ không được lưu lại.`);
    }

    return true;
  }

}
