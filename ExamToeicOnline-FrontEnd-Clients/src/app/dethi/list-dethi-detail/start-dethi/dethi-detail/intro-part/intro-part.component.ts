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

  constructor(private route: ActivatedRoute,
    private deThiService: DethiService,
    private router: Router) { }

  ngOnInit(): void {
    this.deThiService.selectedDeThiChanged$.subscribe(
      (deThiID) => {
        this.deThiId = deThiID;
        // console.log('intro-part dethiID ' + this.deThiId)
      }
    )
    this.route.queryParamMap.subscribe(
      (params) => {
        this.introPart = +params.get('part');
        // console.log('intro-part : ' + this.introPart);
        if (this.introPart) {
          this.deThiService.getInstructionOnPart(this.introPart).subscribe(
            (instruction) => {
              this.instruction = instruction;
              this.onAnswerCorrect(this.instruction.correctAnswer);
              // console.log(JSON.stringify(this.correctAnswer));
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

  onStart() {
    this.router.navigate([`exam/ToeicTest/${this.deThiId}`], { queryParams: { part: this.introPart } })
    this.deThiService.changedpart(this.introPart);
  }

}
