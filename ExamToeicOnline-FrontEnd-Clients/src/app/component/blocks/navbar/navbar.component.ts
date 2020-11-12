import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

import { State, getIsLogin, getCurrentUser } from './../../../user/state/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe, observable } from 'rxjs';

import * as UserActions from '../../../user/state/user.action'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isLogin$: Observable<boolean>;
  currentUser: User = null;
  currentUser$: Observable<User>;
  isLogin: boolean;
  constructor(  private router: Router,
                private store: Store<State>,
                ) { }


  ngOnInit(): void {    
    
  }

  onLogout(){
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/home']);
  }

  onRegister(){
    this.router.navigate(['/auth/register'])
  }

}
