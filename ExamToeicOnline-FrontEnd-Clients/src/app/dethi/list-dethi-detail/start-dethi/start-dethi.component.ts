import { Question } from 'src/app/model/question.model';
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
    private deThiService: DethiService
  ) { }
  deThiCurrent: DeThi;
  errorMessage: string;
  listQuestion: Question[] = [];
  isStartDethi: boolean;


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get("examId");
    if (!isNaN(+id)) {
      this.deThiService.getDeThi(+id).subscribe(
        (data) => {
          this.deThiCurrent = data;
        },
        (error) => (this.errorMessage = error)
      );
    } else {
      this.deThiCurrent = null;
    }
  }

  onStart() {
    this.router.navigate([`exam/ToeicTest/intro`], { queryParams: { examId: this.deThiCurrent.id, part: 1 } })
    sessionStorage.setItem('duration', (Date.now() + this.deThiCurrent.duration * 60 * 1000).toString());
    this.deThiService.durationStart(+sessionStorage.getItem('duration'));
  }



}
