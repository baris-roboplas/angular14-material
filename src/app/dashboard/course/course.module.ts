import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CourseRoutingModule } from './course-routing.module';
import { LessonsComponent } from './lessons/lessons.component';
import { SearchLessonsComponent } from './lessons/search-lessons/search-lessons.component';
import { LessonComponent } from './lessons/search-lessons/lesson/lesson.component';

@NgModule({
  declarations: [...CourseRoutingModule.components, LessonsComponent, SearchLessonsComponent, LessonComponent, LessonComponent, ],
  imports: [CourseRoutingModule, SharedModule],
})
export class CourseModule {}
