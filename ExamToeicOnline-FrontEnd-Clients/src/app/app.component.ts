import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mdb-angular-free';

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.autoLogin();
  }

  

}
