import { areCoursesLoaded } from './courses.selectors';
import { AppState } from '..';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { loadAllCourses } from './course.actions';

@Injectable()
export class CoursesResolver implements Resolve<any> {
    
    loading = false;

    constructor(private store: Store<AppState>) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded)=> {
                if(!this.loading && !coursesLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded), // make sure that the continued will access only if the courses has been loaded
            // this observable will be terminated only if f the courses has bee loaded
            first(), //Ensures that the observable emits at least once
            finalize(()=> this.loading=false)
        );
    }  
}