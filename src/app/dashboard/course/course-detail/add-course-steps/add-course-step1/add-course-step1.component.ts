import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { conditionalValidator } from 'src/app/validators/conditionalValidator';
import { CoursesService } from './../../../../../services/courses.service';
import { courseTitleValidator } from 'src/app/validators/course-title.validator';

/**
 * This component is step 1 form to be used to add a new course
 *
 * Keywords: reactive forms, asyncvalidator, conditionalValidator, pitfall
 *
 */
@UntilDestroy()
@Component({
  selector: 'app-add-course-step1',
  templateUrl: './add-course-step1.component.html',
  styleUrls: ['./add-course-step1.component.scss'],
})
export class AddCourseStep1Component implements OnInit {
  // pitfall: defining type here as formGroup is a pitfall so form value assignments should be handled here, not in the onInit
  form = this.formBuilder.group({
    title: [
      '',
      {
        validators: [
          // note: all validation errors are shown at the same time if the validation rules are violated
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          Validators.pattern(/.+@.+\..+/),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        updateOn: 'blur',
      },
    ],
    setDate: [false],
    releasedAt: [
      '',
      [
        conditionalValidator(
          (): any => this.form.get('setDate')?.value,
          Validators.required,
          'releasedAtMandatoryError'
        ),
      ],
    ],
    downloadsAllowed: [
      false,
      {
        validators: [Validators.requiredTrue],
      },
    ],
    longDescription: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      },
    ],
  });

  // getters of formControls
  get _title() {
    return this.form.get('title') as FormControl;
  }
  get _setDate() {
    return this.form.get('setDate') as FormControl;
  }
  get _releasedAt() {
    return this.form.get('releasedAt') as FormControl;
  }
  get _downloadsAllowed() {
    return this.form.get('downloadsAllowed') as FormControl;
  }
  get _longDescription() {
    return this.form.get('longDescription') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.form.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
      // case: gather all formControls
      let formControlsValidies = {};
      Object.entries(this.form.controls).forEach(([key, formControl]) => {
        formControlsValidies = {
          ...formControlsValidies,
          [key]: formControl.valid,
        };
      });
      // case: check if all formControls are valid except downloadsAllowed(controlForm)
      let isFormValidExceptDownloadsAllowed = Object.entries(
        formControlsValidies
      ).every(([key, value]) => {
        if (key === 'downloadsAllowed') return true;
        return value;
      });

      // state: downloadsAllowed(controlForm) is checked and has errors, the rest is not important
      // Action: remove errors from downloadsAllowed(controlForm)
      if (
        this._downloadsAllowed.value === true &&
        this._downloadsAllowed.errors
      ) {
        this._downloadsAllowed.setErrors(null);
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has no obligatoryConfirmError, other fields are valid
        // action: set obligatoryConfirmError to downloadsAllowed(controlForm)
        this._downloadsAllowed.value === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError === undefined &&
        isFormValidExceptDownloadsAllowed === true
      ) {
        this._downloadsAllowed.setErrors({ obligatoryConfirmError: true });
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has obligatoryConfirmError, other fields are valid
        // action: do nothing
        this._downloadsAllowed.value === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError === true &&
        isFormValidExceptDownloadsAllowed === true
      ) {
        return;
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has obligatoryConfirmError, other fields are invalid
        // action: set required to downloadsAllowed(controlForm)
        this._downloadsAllowed.value === false &&
        isFormValidExceptDownloadsAllowed === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError
      ) {
        this._downloadsAllowed.setErrors({ required: true });
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has no obligatoryConfirmError, other fields are invalid
        // action: do nothing
        this._downloadsAllowed.value === false &&
        isFormValidExceptDownloadsAllowed === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError
      ) {
        return;
      }
    });

    // case: if setDate is checked, releasedAt should be reset
    this.form.controls.setDate.valueChanges
      .pipe(untilDestroyed(this))
     // advice: as a last resort, use distinctUntilChanged to prevent Maximum call stack size exceeded when using valueChanges
      .subscribe((value) => {
        if (value) this._releasedAt.reset();
        this.form.controls.releasedAt.updateValueAndValidity();
      });
  }
}
