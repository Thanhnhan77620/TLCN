import { Instruction } from '../../../../../../model/instruction.model';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;
  instruction: Instruction = null;


  introPart: number;
  errorMessage: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  // onAnswerSelected(value: any, Question) {
  //   this.question.answerSelected = value;
  //   console.log("answer selected: " + this.question.answerSelected);
  // }

}
