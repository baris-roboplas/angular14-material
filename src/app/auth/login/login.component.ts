import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength.validator';

/**
 * @keywords Reactive Forms vs Template Driven Forms (TDF; basic features, custom validation included)
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Starter Template Owner Approach
  // form!: FormGroup;
  // message!: string;
  // loginSubscription!: Subscription;
  // loginLoading = false;
  // static path = () => ['login'];

  // constructor(
  //   private authService: AuthService,
  //   public formBuilder: FormBuilder,
  //   private router: Router,
  //   public snackBar: MatSnackBar
  // ) {
  //   this.initFormBuilder();
  // }

  // loginUser() {
  //   this.loginLoading = true;

  //   this.loginSubscription = this.authService
  //     .loginWithUserCredentials(this.form.value.email, this.form.value.password)
  //     .pipe(finalize(() => (this.loginLoading = false)))
  //     .subscribe(
  //       (data) => {
  //         this.router.navigate(DashboardComponent.path());
  //       },
  //       (error) => {
  //         this.snackBar.open('Access Denied', '', {
  //           duration: 3000,
  //           horizontalPosition: 'end',
  //           verticalPosition: 'bottom',
  //         });
  //       }
  //     );
  // }

  // private initFormBuilder() {
  //   this.form = this.formBuilder.group({
  //     email: [
  //       'john.doe@mailinator.com',
  //       [Validators.required, Validators.email],
  //     ],
  //     password: ['@ngular2+', Validators.required],
  //   });
  // }

  // RF APPROACH
  loginLoading = false;

  // //alternative way of defining form control
  // email = new FormControl('', {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: 'blur',
  // });
  // // preparing from group without form builder api
  // form = new FormGroup({
  //   email: this.email,
  //   password: new FormControl('', {
  //     validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()],
  //   }),
  // });

  form =
    /*  In order to make sure that you use type inference and type forms to its maximum effect,
      make sure to always declare your variables like this without explicitly saying that this is a form group
      led type inference.
      Everything works out of the box and you don't have to do anything special in order to benefit from this
      extra type safety. Other than avoiding the common pitfall of assigning an explicit type to your form variable.
  */
    this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      // email: this.formBuilder.nonNullable.control('', {
      //   validators: [Validators.required, Validators.email],
      //   updateOn: 'blur',
      // }),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator(),
        ],
      ],
    });

  get email() {
    return this.form.get('email') as FormControl;
    // alternative way of getting form control
    // return this.form.controls['email'] as FormControl;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute // If all controls in your form are non nullable, you can use the non nullable form builder. Therefore, you can use reqular syntax // ex: email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }] // private nonNullableFormBuilder: NonNullableFormBuilder,
  ) {
    // Notice that using the form builder, we could also define an individual control.
    // So we're using this control API.
    // We simply will have to pass in here the initial form value and here we can pass an array of form validators
    // or if we prefer, we can also pass in here a configuration object containing one of these free properties.
    // formBuilder.control('', {
    //   validators: [Validators.required],
    // });
  }
  // TDF APPROACH
  // emailTDFValue = {
  //   email: '',
  //   password: ''
  // }

  // loginUserTdf(tdfForm:NgForm, submit:Event) {
  //   console.log('tdfForm Submitted',tdfForm)
  //   console.log('tdfForm submit event',submit)
  // }

  // byEmailTDFChange(changeEvent: any) {
  // console.log('byEmailTDFChange',changeEvent)}

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigate(['dashboard', 'customer']);
    }, 1000);
  }
}
