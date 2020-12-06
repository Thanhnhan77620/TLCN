import { Question } from 'src/app/model/question.model';
import { map, catchError } from "rxjs/operators";
import { DethiService } from "./../../dethi.service";
import { DeThi } from "./../../../model/dethi.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-start-dethi",
  templateUrl: "./start-dethi.component.html",
  styleUrls: ["./start-dethi.component.css"],
})
export class StartDethiComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detThiService: DethiService
  ) { }
  deThiCurrent: DeThi;
  errorMessage: string;
  listQuestion: Question[] = [];

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get("id");

    this.detThiService.getDeThi(+id).subscribe(
      (data) => {
        this.deThiCurrent = data;
      },
      (error) => (this.errorMessage = error)
    );
  }

}
