import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(  private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onLogin(){
    console.log('Login actived')
    this.router.navigate(['/login'])
  }

  onRegister(){
    this.router.navigate(['/singin'])
  }

}
