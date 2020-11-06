import { ContactComponent } from './component/pages/contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/pages/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';



const routes: Routes= [
    {path: '' , redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {
      path: 'auth', 
      loadChildren:() => import('./user/user.module').then(m=>m.UserModule)
    },
    {path: 'contact', component: ContactComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
  