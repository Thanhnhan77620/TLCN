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

  constructor(private deThiService: DethiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(
    //   (params) => {
    //     this.partIntro = +params.get('part');
    //     // console.log('nav: ' + this.partIntro)
    //     this.onPartName(this.partIntro);
    //   }
    // )
    this.deThiService.selectedPartChanged$.subscribe(
      (part) => {
        this.partIntro = part;
        console.log('nav: ' + this.partIntro)
        this.onPartName(this.partIntro);
      }
    )

    this.deThiService.isTesting$.subscribe(
      (value) => this.isTesting = value
    )

    this.deThiService.selectedDeThiChanged$.subscribe(
      (deThiID) => {
        this.deThiId = deThiID;
        this.deThiService.getDeThi(+deThiID).subscribe(
          (data) => {
            this.deThiCurrent = data;
            //console.log("nav: " + JSON.stringify(this.deThiCurrent));
          }
        )
        // console.log('intro-part dethiID ' + this.deThiId)
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
