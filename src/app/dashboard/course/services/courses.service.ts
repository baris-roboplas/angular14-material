import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { Lesson } from '../model/lesson';
import { CourseCategories } from '../model/course-categories';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
    // The index signature [k: string]: string | number means "if you read a property from A with any key of type string, you will get a value of type string | number.
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findCourseCategories() {
    return this.http
      .get<CourseCategories>(`/api/course-categories`)
      .pipe(map((res) => res['categories']));
  }

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get<any>('/api/courses')
      .pipe(map((res) => res['payload'] as Course[]));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<any>('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('pageNumber', '0')
          .set('pageSize', '1000'),
      })
      .pipe(map((res) => res['payload'] as Lesson[]));
  }

  findLessons(
    courseId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get<any>('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload'] as Lesson[]));
  }
}
