import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-steps',
  templateUrl: './add-course-steps.component.html',
  styleUrls: ['./add-course-steps.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true },
    }
  ]
})
export class AddCourseStepsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
