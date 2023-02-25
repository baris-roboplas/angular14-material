import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesService } from './dashboard/course/services/courses.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, // Main routes for application
    CoreModule, // Singleton objects (services, components and resources that are loaded only at app.module level),
  ],
  providers: [CoursesService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
