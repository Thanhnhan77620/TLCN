import { DeThi } from './../../../model/dethi.model';
import { ActivatedRoute } from '@angular/router';
import { DethiService } from './../../../dethi/dethi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-test',
  templateUrl: './navbar-test.component.html',
  styleUrls: ['./navbar-test.component.scss']
})
export class NavbarTestComponent implements OnInit {

  partName: string = '';
  partIntro: number | null;
  isTesting: boolean = false;
  deThiId: number;
  deThiCurrent: DeThi;
  duration = (Date.now() + 120 * 60 * 60 * 1000) - Date.now();

  constructor(private deThiService: DethiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(
      (params) => {
        this.isTesting = !(+params.get('examId') || +params.get('numberQuestion'));
        this.partIntro = +params.get('part');
        this.onPartName(this.partIntro);
        console.log('is Testing: ' + !this.isTesting);
        console.log('is part: ' + this.partIntro);
      }
    )


    this.deThiService.selectedDeThiChanged$.subscribe(
      (deThiID) => {
        this.deThiId = deThiID;
        this.deThiService.getDeThi(+deThiID).subscribe(
          (data) => {
            this.deThiCurrent = data;
          }
        )
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
}
