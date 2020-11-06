import { UserService } from './../../../user/user.service';
import { User } from './../../../model/user.model';
import { getCurrentUser, State, getIsLogin } from './../../../user/state/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

import * as UserActions from '../../../user/state/user.action'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isLogin$: Observable<boolean>;
  currentUser: User;

  constructor(  private router: Router,
                private store: Store<State>,
                ) { }


  ngOnInit(): void {

    this.isLogin$ = this.store.select(getIsLogin);
    this.store.select(getCurrentUser).subscribe(
      user =>this.currentUser = user
    )
  }

  onLogout(){
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/home']);
  }

  onRegister(){
    this.router.navigate(['/auth/register'])
  }

}
