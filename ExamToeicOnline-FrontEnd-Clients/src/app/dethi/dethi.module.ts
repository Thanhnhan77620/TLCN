import { StartDethiComponent } from "./list-dethi-detail/start-dethi/start-dethi.component";
import { SharedModule } from "./../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DethiComponent } from "./dethi.component";
import { IntroduceDethiComponent } from "./introduce-dethi/introduce-dethi.component";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListDethiDetailComponent } from "./list-dethi-detail/list-dethi-detail.component";
import { DethiDetailComponent } from "./list-dethi-detail/start-dethi/dethi-detail/dethi-detail.component";
import { ListDethiComponent } from "./introduce-dethi/list-dethi/list-dethi.component";
import { ListNumberQuestionComponent } from "./list-dethi-detail/start-dethi/dethi-detail/list-number-question/list-number-question.component";
import { ListQuestionComponent } from './list-dethi-detail/start-dethi/dethi-detail/list-question/list-question.component';

@NgModule({
  declarations: [
    IntroduceDethiComponent,
    ListDethiComponent,
    DethiComponent,
    ListDethiDetailComponent,

    ListNumberQuestionComponent,
    DethiDetailComponent,
    StartDethiComponent,
    ListQuestionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "introduce",
        children: [
          {
            path: "",
            component: IntroduceDethiComponent,
          },
          {
            path: ":id",
            component: StartDethiComponent,
          },
        ],
      },
      {
        path: "ToeicTest",
        component: DethiDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class DethiModule {}
