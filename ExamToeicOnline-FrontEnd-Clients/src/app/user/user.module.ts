import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "auth",
        children: [
          {
            path: "",
            component: LoginComponent,
          },
          {
            path: "login",
            component: LoginComponent,
          },
          {
            path: "register",
            component: RegisterComponent,
          },
          {
            path: ":id/profile",
            component: ProfileComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class UserModule { }
