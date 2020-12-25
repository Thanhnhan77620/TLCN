
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MDBBootstrapModulesPro],
})
export class SharedModule { }
