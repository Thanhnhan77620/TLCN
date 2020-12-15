import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Instruction } from '../../../../../model/instruction.model';
import { DethiService } from 'src/app/dethi/dethi.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-intro-part',
  templateUrl: './intro-part.component.html',
  styleUrls: ['./intro-part.component.scss']
})
export class IntroPartComponent implements OnInit {
  introPart: number;
  instruction: Instruction;
  errorMessage: string;
  correctAnswer: number;
  deThiId: number;
  numberQuestion: number | null;


  listPart = [
    { partName: 1, start: 1, end: 6 },
    { partName: 2, start: 7, end: 25 },
    { partName: 3, start: 32, end: 39 },
    { partName: 4, start: 71, end: 30 },
    { partName: 5, start: 101, end: 30 },
    { partName: 6, start: 131, end: 11 },
    { partName: 7, start: 141, end: 60 },
  ]


  constructor(private route: ActivatedRoute,
    private deThiService: DethiService,
    private router: Router) { }

  ngOnInit(): void {
    this.deThiService.selectedDeThiChanged$.subscribe(
      (deThiID) => {
        this.deThiId = deThiID;
      }
    )
    this.route.queryParamMap.subscribe(
      (params) => {
        this.introPart = +params.get('part');
        if (this.introPart) {
          this.deThiService.getInstructionOnPart(this.introPart).subscribe(
            (instruction) => {
              this.instruction = instruction;
              this.onAnswerCorrect(this.instruction.correctAnswer);
            },
            (error) => {
              this.errorMessage = error;
              console.log(this.errorMessage);
            }
          )
        }
      }
    )


  }

  onAnswerCorrect(answer: string) {
    switch (answer) {
      case "A": {
        this.correctAnswer = 0;
        break;
      }
      case "B": {
        this.correctAnswer = 1;
        break;
      }
      case "C": {
        this.correctAnswer = 2;
        break;
      }
      case "D": {
        this.correctAnswer = 3;
        break;
      }
      default: {
        this.correctAnswer = -1;
        break;
      }
    }
  }

  onNumberQuestionStartPart(part: number) {
    switch (part) {
      case 1: {
        this.numberQuestion = 1;
        break;
      }
      case 2: {
        this.numberQuestion = 7;
        break;
      }
      case 3: {
        this.numberQuestion = 32;
        break;
      }
      case 4: {
        this.numberQuestion = 71;
        break;
      }
      case 5: {
        this.numberQuestion = 101;
        break;
      }
      case 6: {
        this.numberQuestion = 131;
        break;
      }
      case 7: {
        this.numberQuestion = 141;
        break;
      }
      default: {
        this.numberQuestion = null;
        break;
      }
    }
  }

  onStart() {
    this.onNumberQuestionStartPart(this.introPart);
    this.router.navigate([`exam/ToeicTest/${this.deThiId}`], { queryParams: { part: this.introPart, numberQuestion: this.numberQuestion } })
    this.deThiService.changedpart(this.introPart);
  }

}
