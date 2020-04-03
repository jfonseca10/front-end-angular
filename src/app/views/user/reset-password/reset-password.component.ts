import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { error } from "@angular/compiler/src/util";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  emailModel = 'demo@vien.com';
  passwordModel = 'demovien1122';

  buttonDisabled = false;
  buttonState = '';
  code = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.code = this.activatedRoute.snapshot.params.code || null;

  }

  ngOnInit() {
    this.authService.verifyCode(this.code).then().catch(({error}) => {
      this.router.navigate(['error']);
    })
  }

  onSubmit() {
    if (!this.resetForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.authService.resetPassword({code: this.code, npwd: this.resetForm.value.newPassword}).then(() => {
      this.notifications.create('Done', 'Password reset completed, you will be redirected to Login page!', NotificationType.Bare, {
        theClass: 'outline primary',
        timeOut: 6000,
        showProgressBar: true
      });
      this.buttonDisabled = false;
      this.buttonState = '';
      setTimeout(() => {
        this.router.navigate(['user/login']);
      }, 6000);
    }).catch(({error}) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      this.notifications.create('Error', error.message, NotificationType.Bare, {
        theClass: 'outline primary',
        timeOut: 6000,
        showProgressBar: false
      });
    })

    // this.authService.resetPassword(this.resetForm.value).subscribe(() => {
    //   this.notifications.create('Done', 'Password reset completed, you will be redirected to Login page!', NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
    //   this.buttonDisabled = false;
    //   this.buttonState = '';
    //   setTimeout(() => {
    //     this.router.navigate(['user/login']);
    //   }, 6000);
    // }, (error) => {
    //   this.buttonDisabled = false;
    //   this.buttonState = '';
    //   this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    // });
  }
}
