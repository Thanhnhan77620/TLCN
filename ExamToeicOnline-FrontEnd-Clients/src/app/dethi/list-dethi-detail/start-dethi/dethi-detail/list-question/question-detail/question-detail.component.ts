import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  formAnswer: FormGroup;
  deThiId: number | null;
  numberQuestionId: number;
  introPart: number;
  errorMessage: any;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formAnswer = this.fb.group({
      questionId: '',
      listAnswers: this.fb.array([
        this.fb.group({
          option: ''
        })
      ])
    })
  }

  changeSelected(event) {
    // this.listAnswers.push({ a })

  }

  onList(listAnswer: Map<number, number>) {
    listAnswer.forEach(e => {
      console.log(e['key'])
    })
  }

}
