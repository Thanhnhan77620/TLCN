import { Component, Input, OnInit, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-number-question-detail',
  templateUrl: './number-question-detail.component.html',
  styleUrls: ['./number-question-detail.component.scss']
})
export class NumberQuestionDetailComponent implements OnInit {

  constructor() { }

  @Input() partName: number;
  @Input() start: number;
  @Input() end: number;

  ngOnInit(): void {
  }

  arrayQuestion(end: number, start: number): number[] {
    return [...Array(end).keys()].map((i) => i + start);
  }

}
