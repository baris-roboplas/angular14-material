import { MessagesComponent } from '../../shared/components/messages/messages.component';
import { LessonsComponent } from './lessons/lessons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesCardListComponent } from './course-list/courses-card-list/courses-card-list.component';
import { CourseDialogComponent } from './course-list/course-dialog/course-dialog.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SearchLessonsComponent } from './lessons/search-lessons/search-lessons.component';
import { LessonComponent } from './lessons/search-lessons/lesson/lesson.component';
import { CourseComponent } from './course.component';
import { CustomFormControlsComponent } from './custom-form-controls/custom-form-controls.component';
import { AddCourseStep1Component } from './custom-form-controls/add-course-steps/add-course-step1/add-course-step1.component';
import { AddCourseStep2Component } from './custom-form-controls/add-course-steps/add-course-step2/add-course-step2.component';
import { AddCourseStep3Component } from './custom-form-controls/add-course-steps/add-course-step3/add-course-step3.component';
import { AddCourseStepsComponent } from './custom-form-controls/add-course-steps/add-course-steps.component';
import { AddressFormComponent } from './custom-form-controls/address-form/address-form.component';
import { RatingInputComponent } from './custom-form-controls/rating-input/rating-input.component';
import { CourseResolver } from './services/course.resolver';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: 'details/:courseId', //caution: do not use path: ':courseId directly since it overrides others
    component: CourseDetailComponent,
    resolve: {
      course: CourseResolver,
    },
  },
  {
    path: 'search-lessons',
    component: LessonsComponent,
  },
  {
    path: 'custom-form-controls',
    component: CustomFormControlsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolver],
})
export class CourseRoutingModule {
  static components = [
    CourseListComponent,
    CourseDetailComponent,
    CoursesCardListComponent,
    CourseDialogComponent,
    LessonsComponent,
    SearchLessonsComponent,
    LessonComponent,
    CourseComponent,
    CustomFormControlsComponent,
    AddressFormComponent,
    AddCourseStep1Component,
    AddCourseStep2Component,
    AddCourseStep3Component,
    AddCourseStepsComponent,
    RatingInputComponent,
  ];
}
