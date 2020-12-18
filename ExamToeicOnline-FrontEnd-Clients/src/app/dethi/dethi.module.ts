import { QuestionResolver } from './dethi-resolver.service';
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
import { QuestionDetailComponent } from './list-dethi-detail/start-dethi/dethi-detail/list-question/question-detail/question-detail.component';
import { NumberQuestionDetailComponent } from './list-dethi-detail/start-dethi/dethi-detail/list-number-question/number-question-detail/number-question-detail.component';
import { IntroPartComponent } from './list-dethi-detail/start-dethi/dethi-detail/intro-part/intro-part.component';

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
    QuestionDetailComponent,
    NumberQuestionDetailComponent,
    IntroPartComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: ":examId",
            component: StartDethiComponent,
          },
          {
            path: "ToeicTest",
            component: DethiDetailComponent,
            children: [
              {
                path: 'intro',
                component: IntroPartComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
              },
              {
                path: 'test',
                component: ListQuestionComponent,
                resolve: { resolvedListQuestionsData: QuestionResolver },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange'
              }
            ]
          },
        ]
      }
    ]),
    SharedModule,
  ],
})
export class DethiModule { }
