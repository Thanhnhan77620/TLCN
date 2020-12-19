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

  aswerSelected = {
    key: null,
    value: null
  }
  listAswerSelected = [
    this.aswerSelected
  ]
  deThiId: number | null;
  numberQuestionId: number;
  introPart: number;
  errorMessage: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  changeSelected(event) {
    // this.answerSelected[this.question.id - (this.question.examId - 1) * 200] = event.target.value;
  }

  onList(listAnswer: Map<number, number>) {
    listAnswer.forEach(e => {
      console.log(e['key'])
    })
  }

}
