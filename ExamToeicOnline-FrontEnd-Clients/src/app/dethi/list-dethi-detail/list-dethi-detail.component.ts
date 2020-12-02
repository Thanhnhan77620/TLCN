import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-dethi-detail',
  templateUrl: './list-dethi-detail.component.html',
  styleUrls: ['./list-dethi-detail.component.scss']
})
export class ListDethiDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onStart(){
    this.router.navigate(['/start']);
  }

}
