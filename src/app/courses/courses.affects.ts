import { map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { concatMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { CourseActions } from './action-types';

@Injectable()
export class CoursesAffects {

    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap( () => this.coursesHttpService.findAllCourses()), // only one request at any time
            map(courses => CourseActions.allCoursesLoaded({courses}))
        )
    )

    saveCourses$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CourseActions.coursesUpdate),
                concatMap(action => this.coursesHttpService.saveCourse(
                    action.update.id,
                    action.update.changes
                ))
            ),
            {dispatch: false}
    )

    constructor(private actions$: Actions, private coursesHttpService:CoursesHttpService) {}
}