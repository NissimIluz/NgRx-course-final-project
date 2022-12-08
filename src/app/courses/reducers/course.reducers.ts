import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';
import { compareCourses, Course } from './../model/course';

export interface CoursesState_1 { // the entity format
    entities: {[key:number]: Course},
    ids: number []
}

export interface CoursesState extends EntityState<Course> { 
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    selectId: a => a.id // mast be uniq. default - id
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addMany(
            action.courses, 
            {...state, allCoursesLoaded:true})),
    on(CourseActions.coursesUpdate, 
        (state, action) => adapter.updateOne(action.update, state)
    )
);

export const {selectAll} = adapter.getSelectors();