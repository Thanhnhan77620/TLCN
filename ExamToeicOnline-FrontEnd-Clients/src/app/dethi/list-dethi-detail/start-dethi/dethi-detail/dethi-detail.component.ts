import { DethiService } from 'src/app/dethi/dethi.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dethi-detail',
  templateUrl: './dethi-detail.component.html',
  styleUrls: ['./dethi-detail.component.scss']
})
export class DethiDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private deThiService: DethiService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('examId');

  }

}
