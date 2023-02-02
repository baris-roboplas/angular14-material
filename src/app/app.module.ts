import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { OnlyOneErrorPipe } from './pipes/only-one-error.pipe';
import { CourseResolver } from './services/course.resolver';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, // Main routes for application
    CoreModule, // Singleton objects (services, components and resources that are loaded only at app.module level)
  ],
  providers: [
    CoursesService,
    CourseResolver
],
  bootstrap: [AppComponent],
})
export class AppModule {}
