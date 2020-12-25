import { GroupQuestion } from './../model/groupQuestion.model';
import { Instruction } from '../model/instruction.model';
import { catchError } from "rxjs/operators";
import { DeThi } from "./../model/dethi.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Question } from "../model/question.model";

@Injectable({
  providedIn: "root",
})
export class DethiService {
  private submitResult = new BehaviorSubject<any | null>(null);
  resultSubmit$ = this.submitResult.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private _duration = new BehaviorSubject<number>(null);
  isDuration = this._duration.asObservable();

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

  submit() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const user: any = JSON.parse(localStorage.getItem('userData'));
    const body = {
      userid: user.userId,
      examid: +sessionStorage.getItem("examId"),
      startedat: +sessionStorage.getItem('start'),
      finishedat: +(Date.now()),
      answerSelectVMs: JSON.parse(sessionStorage.getItem("listAnswerSelected")),
    }
    console.log(body);
    return this.http.post(`https://localhost:5001/api/exams/tomark`, body)
      .pipe(catchError(this.handleError))

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

  durationStart(value: number) {
    this._duration.next(value);
  }

}
