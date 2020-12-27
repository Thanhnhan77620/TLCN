import { DethiService } from './../../dethi/dethi.service';
import { HistoryExam } from './../../model/historyExam';
import { UserService } from './../user.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'ng-uikit-pro-standard';
import * as moment from 'moment';


@Component({
  selector: 'app-history-exam',
  templateUrl: './history-exam.component.html',
  styleUrls: ['./history-exam.component.scss']
})
export class HistoryExamComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective


  previous: any = [];
  headElements = ['STT', 'Tên Bài Test', 'Score Listening', 'Score Reading', 'Thời gian bắt đầu bài thi', 'Thời gian kết thúc bài thi', 'Làm lại'];
  errorMessage: any;
  elements: any = [];
  listHistoryExam: HistoryExam[] = [];

  constructor(private cdRef: ChangeDetectorRef,
    private userService: UserService,
    private deThiService: DethiService) { }

  ngOnInit() {
    this.userService.viewHistoryExam().subscribe(
      (data) => {
        this.listHistoryExam = data;
        for (let i = 0; i < this.listHistoryExam.length; i++) {
          if (!isNaN(this.listHistoryExam[i].examId)) {
            this.deThiService.getDeThi(+this.listHistoryExam[i].examId).subscribe(
              (data) => {
                this.listHistoryExam[i].examTitle = data.title;
              }
            )
            this.elements.push({ element: this.listHistoryExam[i] });
          }
        }
      },
      (error) => (this.errorMessage = error),
      () => {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}

