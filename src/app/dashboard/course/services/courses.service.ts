import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { CourseCategories } from '../model/course-categories';
import { Lesson } from '../lessons/models/lesson';

interface Courses {
  payload: Course[];
}
@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
    // The index signature [k: string]: string | number means "if you read a property from A with any key of type string, you will get a value of type string | number.
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  findCourseCategories() {
    return this.http.get<CourseCategories>(`/api/course-categories`).pipe(
      map((res) => res['categories']),
      shareReplay()
    );
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get<Courses>('/api/courses').pipe(
      map((res) => res['payload']),
      shareReplay()
    );
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<any>('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('pageNumber', '0')
          .set('pageSize', '1000'),
      })
      .pipe(
        map((res) => res['payload'] as Lesson[]),
        shareReplay()
      );
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
      .pipe(
        map((res) => res['payload'] as Lesson[]),
        shareReplay()
      );
  }

  loadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>('/api/lessons', {
        params: {
          pageSize: '10000',
          courseId: courseId.toString(),
        },
      })
      .pipe(
        map((res: any) => res['payload']),
        shareReplay()
      );
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map((res: any) => res['payload']),
      shareReplay()
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }
}
