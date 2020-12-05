import { UserModule } from "./user/user.module";
import { DethiModule } from "./dethi/dethi.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./component/blocks/navbar/navbar.component";
import { FooterComponent } from "./component/blocks/footer/footer.component";
import { CarouselComponent } from "./component/blocks/carousel/carousel.component";
import { HomeComponent } from "./component/pages/home/home.component";
import { ContactComponent } from "./component/pages/contact/contact.component";
import { BodyComponent } from "./component/blocks/body/body.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    ContactComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    DethiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
