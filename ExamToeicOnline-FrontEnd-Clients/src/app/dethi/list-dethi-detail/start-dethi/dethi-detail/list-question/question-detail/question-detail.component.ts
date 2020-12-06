import { Question } from 'src/app/model/question.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;
  constructor() { }

  ngOnInit(): void {

  }

}
