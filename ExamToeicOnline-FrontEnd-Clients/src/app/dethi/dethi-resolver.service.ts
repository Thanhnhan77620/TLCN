import { ListQuestionResolved } from './../model/question.model';
import { of } from 'rxjs';
import { DethiService } from 'src/app/dethi/dethi.service';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ListDeThiResolved } from '../model/dethi.model';


@Injectable({
    providedIn: 'root'
})
export class QuestionResolver implements Resolve<ListQuestionResolved>{
    constructor(private deThiService: DethiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListQuestionResolved | Observable<ListQuestionResolved> | Promise<ListQuestionResolved> {
        const deThiId = route.queryParamMap.get('examId');
        const partId = route.queryParamMap.get('part');
        if (isNaN(+deThiId) || isNaN(+partId)) {
            const message = `DeThi was invalid`;
            console.error(message);
            return of({ listQuestions: null, error: message });
        }

        return this.deThiService.getListQuestion(+deThiId, +partId).pipe(
            map(listQuestions => ({ listQuestions: listQuestions })),
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