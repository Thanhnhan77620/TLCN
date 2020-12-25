import { SubmitComponent } from './../../../dethi/list-dethi-detail/start-dethi/dethi-detail/list-question/submit/submit.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeThi } from './../../../model/dethi.model';
import { ActivatedRoute } from '@angular/router';
import { DethiService } from './../../../dethi/dethi.service';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-navbar-test',
  templateUrl: './navbar-test.component.html',
  styleUrls: ['./navbar-test.component.scss']
})
export class NavbarTestComponent implements OnInit {

  partName: string = '';
  partIntro: number | null;
  deThiId: number;
  deThiCurrent: DeThi;
  counter: number;
  message: string;
  isSubmit: boolean = false;
  modalRef: MDBModalRef;
  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {
      content: {
        scoreListening: '',
        scoreReading: '',
        score: ''
      }
    }
  }

  @ViewChild('countdown') countdown: CountdownComponent;
  constructor(private deThiService: DethiService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.deThiService.isDuration.subscribe(
      () => {
        this.counter = (+sessionStorage.getItem('duration') - Date.now()) / 1000;
      }
    )
    this.route.queryParamMap.subscribe(
      (params) => {
        this.deThiId = +params.get('examId');
        this.deThiService.getDeThi(this.deThiId).subscribe(
          (data) => {
            this.deThiCurrent = data;
          }
        )
        this.partIntro = +params.get('part');
        this.onPartName(this.partIntro);
      }
    )
  }

  onPartName(partNumber: number | null) {
    switch (partNumber) {
      case 1:
        this.partName = "Part I: Picture Description";
        break;
      case 2:
        this.partName = "Part II: Question - Response";
        break;
      case 3:
        this.partName = "Part III: Short Conversations";
        break;
      case 4:
        this.partName = "Part IV: Short Talks";
        break;
      case 5:
        this.partName = "Part V: Incomplete Sentences";
        break;
      case 6:
        this.partName = "Part VI: Incomplete Sentences";
        break;
      case 7:
        this.partName = "Part VII: Reading Comprehension";
        break;
      default:
        this.partName = null;
        break;
    }
  }

  onFinished(event: CountdownEvent) {
    if (event.action == 'done') {
      alert('Time out - Stop it');
      sessionStorage.removeItem('duration');
    }
  }

  onStop(event: CountdownEvent) {

  }


  onSubmit() {
    this.deThiService.submit().subscribe(
      (data: any) => {
        console.log(data)
        this.modalOptions.data.content.scoreListening = data.scoreListening
        this.modalOptions.data.content.scoreReading = data.scoreReading
        this.modalOptions.data.content.score = data.scoreListening + data.scoreReading

      },
      errorMessage => {
        this.message = errorMessage;
        console.log(this.message)
      }
    )

    this.modalRef = this.modalService.show(SubmitComponent, this.modalOptions)
    this.isSubmit = true;
    sessionStorage.removeItem("listAnswerSelected");
    sessionStorage.removeItem("start");
    sessionStorage.removeItem("duration");
    sessionStorage.removeItem("examId");
  }

  onCancel() {
    this.isSubmit = false;
    this.router.navigate(['/home']);
  }
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {

    value = value / 1000;
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);

    return (
      ("00" + hours).slice(-2) +
      ":" +
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
