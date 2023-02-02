import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'movie',
        loadChildren: () =>
          import('./movie/movie.module').then((m) => m.MovieModule),
      },
      {
        path: 'course',
        loadChildren: () =>
          import('./course/course.module').then((m) => m.CourseModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule],
})
export class DashboarRoutingModule {
  static components = [DashboardComponent, HomeComponent];
}
