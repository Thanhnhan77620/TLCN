import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

import { Component, OnInit } from '@angular/core';
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
  isLogin: boolean;
  constructor(  private router: Router,
                ) { }


  ngOnInit(): void {    
    
  }

  onLogout(){
    this.router.navigate(['/home']);
  }

  onRegister(){
    this.router.navigate(['/auth/register'])
  }

}
