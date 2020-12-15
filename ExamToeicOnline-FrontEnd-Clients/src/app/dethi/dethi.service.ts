import { GroupQuestion } from './../model/groupQuestion.model';
import { Instruction } from '../model/instruction.model';
import { tap, catchError } from "rxjs/operators";
import { DeThi } from "./../model/dethi.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { Question } from "../model/question.model";

@Injectable({
  providedIn: "root",
})
export class DethiService {

  private deThiSelected = new BehaviorSubject<number | null>(null);
  selectedDeThiChanged$ = this.deThiSelected.asObservable();
  private isTested = new BehaviorSubject<boolean | null>(null);
  isTesting$ = this.isTested.asObservable();
  private partSelected = new BehaviorSubject<number | null>(null);
  selectedPartChanged$ = this.partSelected.asObservable();


  constructor(private http: HttpClient, private router: Router) { }


  getAllDeThi() {
    return this.http
      .get<DeThi[]>("https://localhost:5001/api/exams/list")
      .pipe(catchError(this.handleError));
  }

  getDeThi(deThiId: number) {
    return this.http
      .get<DeThi>("https://localhost:5001/api/exams?examId=" + deThiId)
      .pipe(catchError(this.handleError));
  }


  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  getListQuestion(dethiId: number, partId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`https://localhost:5001/api/questions/PartName?examId=${dethiId}&partName=Part ${partId}`).pipe(
      catchError(this.handleError)
    );
  }

  getGroupQuestion(dethiId: number, numberQuestion: number): Observable<GroupQuestion[]> {
    return this.http.get<GroupQuestion[]>(`https://localhost:5001/api/questions/list?examId=${dethiId}&numberQuestion=${numberQuestion}`).pipe(
      catchError(this.handleError)
    );
  }

  getInstructionOnPart(partName: number) {
    return this.http.get<Instruction>(`https://localhost:5001/api/Intros/?partName=Part ${partName}`).pipe(
      catchError(this.handleError)
    )
  }

  changedDeThi(deThiId: number | null) {
    this.deThiSelected.next(deThiId);
  }

  changeTestingMode(value: boolean | null) {
    this.isTested.next(value);
  }

  changedpart(part: number | null) {
    this.partSelected.next(part);
  }

}
