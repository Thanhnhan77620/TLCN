import { DethiComponent } from './dethi.component';
import { IntroduceDethiComponent } from './introduce-dethi/introduce-dethi.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDethiComponent } from './list-dethi/list-dethi.component';
import { ListDethiDetailComponent } from './list-dethi-detail/list-dethi-detail.component';
import { StartDethiComponent } from './list-dethi-detail/start-dethi/start-dethi.component';



@NgModule({
  declarations: [
    IntroduceDethiComponent,
    ListDethiComponent,
    DethiComponent,
    ListDethiDetailComponent,
    StartDethiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DethiModule { }
