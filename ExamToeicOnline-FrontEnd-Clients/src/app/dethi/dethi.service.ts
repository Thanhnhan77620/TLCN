import { tap, catchError } from "rxjs/operators";
import { DeThi } from "./../model/dethi.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Question } from "../model/question.model";

@Injectable({
  providedIn: "root",
})
export class DethiService {
  constructor(private http: HttpClient, private router: Router) {}

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

  getAllQuestionInPart(dethiId: number, partId: number) {
    return this.http
      .get<Question[]>(
        "https://localhost:5001/api/questions/PartName?examId=" +
          dethiId +
          "&partName=Part " +
          partId
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
