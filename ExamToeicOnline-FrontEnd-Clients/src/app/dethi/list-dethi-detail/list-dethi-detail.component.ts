
import { DeThi, ListDeThiResolved } from "./../../model/dethi.model";
import { DethiService } from "./../dethi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list-dethi-detail",
  templateUrl: "./list-dethi-detail.component.html",
  styleUrls: ["./list-dethi-detail.component.scss"],
})
export class ListDethiDetailComponent implements OnInit {
  constructor(private router: Router, private deThiService: DethiService, private route: ActivatedRoute) { }

  listDeThi: DeThi[] = [];
  errorMessage: string;


  ngOnInit(): void {
    const resolvedData: ListDeThiResolved = this.route.snapshot.data['resolvedListDeThiComponent'];
    this.errorMessage = resolvedData.error;
    this.listDeThi = resolvedData.listDeThis;
  }

  onStart(id: number) {
    this.router.navigate(["exam", id]);
  }
}
