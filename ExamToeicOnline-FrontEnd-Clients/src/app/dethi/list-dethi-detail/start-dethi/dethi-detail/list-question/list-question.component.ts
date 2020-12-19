import { Question } from './../../../../../model/question.model';
import { DethiService } from 'src/app/dethi/dethi.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupQuestion, ListQuestionResolved } from 'src/app/model/groupQuestion.model';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {

  resolvedData: ListQuestionResolved;
  listQuestion: GroupQuestion[];
  listQuestionSort: Question[];
  errorMessage: string;
  isImage_Scritp: boolean = false;
  isFileAudio: boolean = false;
  numberQuestion: number | null;
  deThiId: number;
  partNumber: number;
  partNumberChanged: number | null;
  isSubmit: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.resolvedData = data.resolvedListQuestionsData;
      }
    )
    this.errorMessage = this.resolvedData.error;
    this.listQuestion = this.resolvedData.listQuestions;
    this.listQuestionSort = this.listQuestion[0].questions.sort(
      (a, b) => a.id - b.id
    )
    this.isImage_Scritp = !this.listQuestion[0].paragraphs.length;
    this.isFileAudio = !this.listQuestion[0].fileAudios.length;
    this.partNumber = +this.route.snapshot.queryParamMap.get('part');
    this.deThiId = +this.route.snapshot.queryParamMap.get('examId');
    this.numberQuestion = +this.route.snapshot.queryParamMap.get('numberQuestion');
  }

  onNext() {
    const len = this.listQuestion[0].questions.length;
    this.numberQuestion = (this.listQuestion[0].questions[len - 1].id - ((this.deThiId - 1) * 100) + 1);
    this.changedPart(this.numberQuestion);
    if (this.partNumber != this.partNumberChanged) {
      this.router.navigate([`exam/ToeicTest/intro`], { queryParams: { examId: this.deThiId, part: this.partNumberChanged } })
    } else {
      this.router.navigate([`exam/ToeicTest/test`], { queryParams: { examId: this.deThiId, part: this.partNumber, numberQuestion: this.numberQuestion } })
    }
  }


  changedPart(numberQuestion: number) {
    if (numberQuestion >= 1 && numberQuestion < 7) {
      this.partNumberChanged = 1;
    } else if (numberQuestion > 6 && numberQuestion < 31) {
      this.partNumberChanged = 2;
    } else if (numberQuestion > 30 && numberQuestion < 71) {
      this.partNumberChanged = 3;
    } else if (numberQuestion > 70 && numberQuestion < 101) {
      this.partNumberChanged = 4;
    } else if (numberQuestion > 100 && numberQuestion < 131) {
      this.partNumberChanged = 5;
    } else if (numberQuestion > 130 && numberQuestion < 147) {
      this.partNumberChanged = 6;
    } else {
      this.partNumberChanged = 7;
    }
  }
}