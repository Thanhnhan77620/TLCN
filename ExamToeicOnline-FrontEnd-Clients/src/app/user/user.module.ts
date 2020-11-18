import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module'; 
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
const userRoutes: Routes = [
  {
    path:'',
    component: LoginComponent,
    children:[
      {path: 'login', component:LoginComponent},
      {path:  'register', component: RegisterComponent},
      {path: 'user/profile', component: ProfileComponent}
    ]
  }
 
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    RouterModule.forChild(userRoutes)
  
  ],
  declarations: [
    LoginComponent
  ],
})
export class UserModule { }
