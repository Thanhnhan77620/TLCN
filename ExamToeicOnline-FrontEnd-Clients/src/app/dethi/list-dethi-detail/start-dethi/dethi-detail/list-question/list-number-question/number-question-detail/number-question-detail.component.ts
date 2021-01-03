import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DethiService } from 'src/app/dethi/dethi.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-question-detail',
  templateUrl: './number-question-detail.component.html',
  styleUrls: ['./number-question-detail.component.scss']
})
export class NumberQuestionDetailComponent implements OnInit {

  constructor(private deThiService: DethiService,
    private router: Router,
    private route: ActivatedRoute) { }


  @Input() partName: number;
  @Input() start: number;
  @Input() end: number;
  deThiId: number;
  numberQuestionSubscription: any;
  question = [];
  isChecked: boolean = false;


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => {
        this.deThiId = +params.get('examId');
      }
    )
  }

  arrayQuestion(end: number, start: number): number[] {
    return [...Array(end).keys()].map((i) => i + start);
  }

  onInstruction(partName: number) {
    this.router.navigate([`exam/ToeicTest/intro`], { queryParams: { examId: this.deThiId, part: partName } })
  }

  onClickQuestion(numberQuestion: number) {

    this.router.navigate([`exam/ToeicTest/test`], { queryParams: { examId: this.deThiId, part: this.partName, numberQuestion: numberQuestion } })
  }


  onChanged(value: number): boolean {
    if (sessionStorage.getItem('listAnswerSelected')) {
      let listQuestionChecked: any[] = JSON.parse(sessionStorage.getItem('listAnswerSelected'));
      if (listQuestionChecked.findIndex(p => p.questionId - ((this.deThiId - 1) * 200) === value) !== -1) {
        return true;
      }
    }
    return false;
  }
}
