import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Course } from '../model/course';
import { first, Observable } from 'rxjs';
import { CoursesService } from './courses.service';

/**
 * @keywords resolver
 *
 * @implements {Resolve<Course>}
 */
@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    // route.paramMap.get('id');
    console.log('CourseResolver.resolve() called');
    return this.coursesService.findCourseById(route.params['courseId']);
    // .pipe(first())   if  we want to complete the observable after the first value is emitted but we know that this will be emitted only once almost so no need first()
  }
}
