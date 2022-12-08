import { Course } from './model/course';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction(
    "[Courses Resolver] Load All Courses", // Resolver - user for load data before tha page load
);

export const allCoursesLoaded = createAction(
    "[Load Courses Effect] All courses Loaded",
    props<{courses: Course []}>()
);

export const coursesUpdate = createAction(
    "[Edit Course dialog] Courses Update",
    props<{update: Update<Course>}>() // the type is Partial<Type>
);