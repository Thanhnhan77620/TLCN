import { RegisterComponent } from './register/register.component';
import { UserEffects } from './state/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './state/user.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module'; 
import { LoginComponent } from './login/login.component';

const userRoutes: Routes = [
  {
    path:'',
    component: LoginComponent,
    children:[
      {path: 'login', component:LoginComponent},
      {path:'register', component: RegisterComponent}
    ]
  }
 
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
