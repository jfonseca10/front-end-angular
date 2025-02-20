import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;


  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.signIn(this.loginForm.value).pipe(first()).subscribe(() => {
      this.router.navigate(['/app/registro-asistencia']);
    }, ({error}) => {
      console.log(error);
      this.buttonDisabled = false;
      this.buttonState = '';
      this.notifications.create('Error', error, NotificationType.Bare, {
        theClass: 'outline primary',
        timeOut: 6000,
        showProgressBar: false
      });
    });
    // this.authService.signIn(this.loginForm.value).subscribe((user) => {
    //   this.router.navigate(['/']);
    // }, (error) => {
    //   this.buttonDisabled = false;
    //   this.buttonState = '';
    //   this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    // });
  }
}
