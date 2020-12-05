import { catchError } from "rxjs/operators";
import { DeThi } from "./../../model/dethi.model";
import { DethiService } from "./../dethi.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-list-dethi-detail",
  templateUrl: "./list-dethi-detail.component.html",
  styleUrls: ["./list-dethi-detail.component.scss"],
})
export class ListDethiDetailComponent implements OnInit {
  constructor(private router: Router, private deThiService: DethiService) {}

  listDeThi: DeThi[] = [];
  errorMessage: string;

  ngOnInit(): void {
    this.deThiService.getAllDeThi().subscribe({
      next: (deThis) => {
        this.listDeThi = deThis;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // onStart() {
  //   this.router.navigate(["/start"]);
  // }
}
