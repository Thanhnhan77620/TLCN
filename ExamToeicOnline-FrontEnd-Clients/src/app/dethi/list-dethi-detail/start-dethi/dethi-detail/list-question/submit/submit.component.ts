import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  scoreListening: string;
  scoreReading: string;
  score: string;
  content: any

  constructor(public modalRef: MDBModalRef, private router: Router) { }

  ngOnInit(): void {

  }
  
  onCancel(){
    this.router.navigate(['/home']);
  }
}
