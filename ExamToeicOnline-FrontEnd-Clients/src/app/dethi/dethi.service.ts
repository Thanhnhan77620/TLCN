import { tap, catchError } from "rxjs/operators";
import { DeThi } from "./../model/dethi.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError, Subject } from "rxjs";
import { Question } from "../model/question.model";

@Injectable({
  providedIn: "root",
})
export class DethiService {



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
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


}
