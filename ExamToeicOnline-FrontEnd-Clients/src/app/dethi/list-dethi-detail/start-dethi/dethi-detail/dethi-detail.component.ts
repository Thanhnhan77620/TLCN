import { DethiService } from 'src/app/dethi/dethi.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dethi-detail',
  templateUrl: './dethi-detail.component.html',
  styleUrls: ['./dethi-detail.component.scss']
})
export class DethiDetailComponent implements OnInit {

  introPart: number;
  deThiId: number;
  part: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('examId');
    console.log("dethi-detail: dethiid " + id)
    this.route.queryParamMap.subscribe(
      (params) => {
        this.part = + params.get('part');
        console.log('dethi detail: part' + this.part);
      }
    )
  }

}
