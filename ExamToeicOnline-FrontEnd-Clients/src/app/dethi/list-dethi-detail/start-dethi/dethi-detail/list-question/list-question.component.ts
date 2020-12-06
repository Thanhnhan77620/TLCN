import { Question } from 'src/app/model/question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DethiService } from 'src/app/dethi/dethi.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {

  listQuestion: Question[] = [];
  errorMessage: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private detThiService: DethiService) { }

  ngOnInit(): void {
    const examId = this.route.snapshot.queryParamMap.get('examId');
    const partId = this.route.snapshot.queryParamMap.get('part');
    console.log(examId + "  " + partId)
    this.detThiService.getListQuestion(+examId, +partId).subscribe(
      (data) => {
        this.listQuestion = data;
      },
      (error) => (this.errorMessage = error)
    )
  }
}
