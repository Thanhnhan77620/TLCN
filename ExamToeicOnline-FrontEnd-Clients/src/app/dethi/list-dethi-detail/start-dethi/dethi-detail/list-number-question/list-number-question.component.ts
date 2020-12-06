import { ActivatedRoute } from "@angular/router";

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DethiService } from "src/app/dethi/dethi.service";
import { Question } from "src/app/model/question.model";

@Component({
  selector: "app-list-number-question",
  templateUrl: "./list-number-question.component.html",
  styleUrls: ["./list-number-question.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ListNumberQuestionComponent implements OnInit {
  constructor(
    private dethiService: DethiService,
    private route: ActivatedRoute
  ) { }
  listQuestion: Question[] = [];

  errorMessage: string;
  private _partNumber: string;
  set partNumber(value: string) {
    this._partNumber = value;
  }

  listPart = [
    { partName: 1, start: 1, end: 6 },
    { partName: 2, start: 7, end: 25 },
    { partName: 3, start: 32, end: 39 },
    { partName: 4, start: 71, end: 30 },
    { partName: 5, start: 101, end: 30 },
    { partName: 6, start: 131, end: 11 },
    { partName: 7, start: 141, end: 60 },
  ]

  ngOnInit(): void {
    // const deThiId = this.route.snapshot.paramMap.get("id");
    // console.log(deThiId);
    // for (let index = 1; index < 8; index++) {
    //   this.dethiService.getAllQuestionInPart(+deThiId, index).subscribe(
    //     (listQuestions) => {
    //       this.listQuestion = listQuestions;
    //     },
    //     (error) => (this.errorMessage = error)
    //   );
    // }
  }

}
