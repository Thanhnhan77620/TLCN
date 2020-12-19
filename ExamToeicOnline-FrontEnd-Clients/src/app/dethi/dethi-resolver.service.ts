import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { DethiService } from 'src/app/dethi/dethi.service';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ListDeThiResolved } from '../model/dethi.model';
import { ListQuestionResolved } from '../model/groupQuestion.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
    providedIn: 'root'
})
export class QuestionResolver implements Resolve<ListQuestionResolved>{

    numberQuestion: number | null;
    deThiId: number | null;

    constructor(private deThiService: DethiService, private route: ActivatedRoute) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListQuestionResolved | Observable<ListQuestionResolved> | Promise<ListQuestionResolved> {
        // this.deThiId = +route.paramMap.get('examId');
        this.deThiId = +route.queryParamMap.get('examId');
        this.numberQuestion = +route.queryParamMap.get('numberQuestion');
        // console.log('resolver examId:' + this.deThiId);
        if (isNaN(+this.deThiId) || isNaN(+this.numberQuestion)) {
            const message = `DeThi was invalid`;
            console.error(message);
            return of({ listQuestions: null, error: message });
        }
        return this.deThiService.getGroupQuestion(+this.deThiId, +this.numberQuestion).pipe(
            map((listQuestions) => ({ listQuestions: listQuestions })),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.log(message);
                return of({ listQuestions: null, error: message });
            })
        )
    }
}

@Injectable({
    providedIn: 'root'
})
export class ListExamResolver implements Resolve<ListDeThiResolved>{
    constructor(private deThiService: DethiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListDeThiResolved | Observable<ListDeThiResolved> | Promise<ListDeThiResolved> {
        return this.deThiService.getAllDeThi().pipe(
            map(listDeThi => ({ listDeThis: listDeThi })),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.log(message);
                return of({ listDeThis: null, error: message });
            })
        )
    }

}