import { DethiService } from './../../../dethi/dethi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  constructor(private deThiService: DethiService) { }

  ngOnInit(): void {

  }



}
