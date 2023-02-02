import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AddCourseStep1Component } from './course-detail/add-course-steps/add-course-step1/add-course-step1.component';
import { AddCourseStep2Component } from './course-detail/add-course-steps/add-course-step2/add-course-step2.component';
import { AddCourseStep3Component } from './course-detail/add-course-steps/add-course-step3/add-course-step3.component';
import { AddCourseStepsComponent } from './course-detail/add-course-steps/add-course-steps.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  // {
  //   path: '',
  //   component: CourseDetailComponent,
  // },
  {
    path: 'detail',
    component: CourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {
  static components = [
    CourseListComponent,
    CourseDetailComponent,
    AddCourseStepsComponent,
    AddCourseStep1Component,
    AddCourseStep2Component,
    AddCourseStep3Component,
  ];
}
