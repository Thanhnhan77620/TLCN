import { SubmitGuardGuard } from './component/blocks/navbar-test/submit-guard.guard';

import { TestLayoutComponent } from './test-layout/test-layout.component';
import { IntroduceDethiComponent } from './dethi/introduce-dethi/introduce-dethi.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';

import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./component/pages/home/home.component";

import { ContactComponent } from "./component/pages/contact/contact.component";
import { ListExamResolver } from './dethi/dethi-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'introduce',
        component: IntroduceDethiComponent,
        resolve: { resolvedListDeThiComponent: ListExamResolver }
      },
      { path: 'contact', component: ContactComponent },
      {
        path: 'auth',
        data: { preload: false },
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule)
      },
    ],
  },
  {
    path: '',
    component: TestLayoutComponent,
    children: [
      {
        path: 'exam',
        data: { preload: true },
        loadChildren: () =>
          import('./dethi/dethi.module').then(m => m.DethiModule),
      },
    ],
    canDeactivate: [SubmitGuardGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
