import { ActivatedRoute } from "@angular/router";

import { Component, OnInit } from "@angular/core";
import { DethiService } from "src/app/dethi/dethi.service";
import { Question } from "src/app/model/question.model";

@Component({
  selector: "app-list-number-question",
  templateUrl: "./list-number-question.component.html",
  styleUrls: ["./list-number-question.component.scss"],
})
export class ListNumberQuestionComponent implements OnInit {
  constructor(
    private dethiService: DethiService,
    private route: ActivatedRoute
  ) {}
  listQuestion: Question[] = [];
  errorMessage: string;

  ngOnInit(): void {
    const deThiId = this.route.snapshot.paramMap.get("id");
    console.log(deThiId);
    for (let index = 1; index < 8; index++) {
      this.dethiService.getAllQuestionInPart(+deThiId, index).subscribe(
        (listQuestions) => {
          this.listQuestion = listQuestions;
        },
        (error) => (this.errorMessage = error)
      );
    }
  }

  arrayQuestion(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map((i) => i + startFrom);
  }
}
