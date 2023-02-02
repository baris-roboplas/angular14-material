import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { Lesson } from '../model/lesson';
interface res {
  [key: string]: Course[];
}
@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
    // The index signature [k: string]: string | number means "if you read a property from A with any key of type string, you will get a value of type string | number.
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findCourseCategories() {
    return (
      this.http
        .get(`/api/course-categories`)
        // .pipe(map((res) => res['categories']));
        .pipe(map((res) => res as any['categories']))
    );
  }

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get<res>('/api/courses')
      .pipe(map((res) => res['payload']));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return (
      this.http
        .get('/api/lessons', {
          params: new HttpParams()
            .set('courseId', courseId.toString())
            .set('pageNumber', '0')
            .set('pageSize', '1000'),
        })
        // .pipe(map((res) => res['payload']));
        .pipe(map((res) => res as any['payload']))
    );
  }

  findLessons(
    courseId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return (
      this.http
        .get('/api/lessons', {
          params: new HttpParams()
            .set('courseId', courseId.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString()),
        })
        // any mi koyulmalı?
        // .pipe(map((res) => res['payload']));
        .pipe(map((res) => res as any['payload']))
    );
  }
}
