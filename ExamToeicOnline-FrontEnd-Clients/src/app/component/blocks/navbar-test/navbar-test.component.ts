import { DeThi } from './../../../model/dethi.model';
import { ActivatedRoute } from '@angular/router';
import { DethiService } from './../../../dethi/dethi.service';
import { Component, OnInit, Pipe, PipeTransform, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';

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
  @ViewChild('countdown') countdown: CountdownComponent;
  constructor(private deThiService: DethiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deThiService.isDuration.subscribe(
      () => {
        this.counter = (+sessionStorage.getItem('duration') - Date.now()) / 1000;
        console.log(this.counter)
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
    console.log(event)
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
