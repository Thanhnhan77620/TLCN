import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { HistoryExamComponent } from './history-exam/history-exam.component';


@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent, HistoryExamComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "login",
            component: LoginComponent,
          },
          {
            path: "register",
            component: RegisterComponent,
          },
          {
            path: "history-exam",
            component: HistoryExamComponent
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
