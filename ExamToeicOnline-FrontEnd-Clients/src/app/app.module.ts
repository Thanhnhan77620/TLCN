import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/blocks/navbar/navbar.component';
import { FooterComponent } from './component/blocks/footer/footer.component';
import { CarouselComponent } from './component/blocks/carousel/carousel.component';
import { HomeComponent } from './component/pages/home/home.component';
import { ContactComponent } from './component/pages/contact/contact.component';
import { BodyComponent } from './component/blocks/body/body.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';

import { AppRoutingModule } from './app-routing.module';
import { Store, StoreModule } from '@ngrx/store';

import * as fromApp from "./store/app.reducer";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    ContactComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
