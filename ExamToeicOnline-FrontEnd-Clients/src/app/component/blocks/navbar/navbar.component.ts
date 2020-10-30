import { LoginService } from './../../../auth/login/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(  private router: Router,
                private route: ActivatedRoute,
                private loginService:LoginService) { }

  ngOnInit(): void {

  }

  onRegister(){
    this.router.navigate(['/register'])
  }

  onLogout(){
    this.loginService.logout();
  }

}
