import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('valid: ', this.passwordForm.value.email);
    if (!this.passwordForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.sendPasswordEmail(this.passwordForm.value.email).then(result => {
      this.notifications.create('Clave enviada', 'El link para reseteo de clave ha sido enviada al correo institucional', NotificationType.Success, {
        theClass: 'outline primary',
        timeOut: 4000,
        showProgressBar: true
      });
      setTimeout(() => {
        this.router.navigate(['/']);
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
  }

}
