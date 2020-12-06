
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from './component/pages/home/home.component';
import { ContactComponent } from './component/pages/contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import {IntroduceDethiComponent} from './dethi/introduce-dethi/introduce-dethi.component';
import {StartDethiComponent} from './dethi/list-dethi-detail/start-dethi/start-dethi.component';

const routes: Routes= [
    {path: '' , redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'introduce', component: IntroduceDethiComponent },
    {path: 'start', component: StartDethiComponent},
  
    {path: 'auth/login', component:LoginComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'auth/user/profile', component: ProfileComponent},
    {path: 'contact', component: ContactComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
