import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from 'src/app/shared/auth.service';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const a = this.registerForm.value.email
    const b = '@est.umet.edu.ec'
    const resp = a.includes(b)

    if (resp){
      if (!this.registerForm.valid || this.buttonDisabled) {
        return;
      }
      this.buttonDisabled = true;
      this.buttonState = 'show-spinner';
      this.authService.register(this.registerForm.value).then(result => {
        this.router.navigate(['/']);
      }).catch(({error}) => {
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.create('Error', error.message, NotificationType.Bare, {
          theClass: 'outline danger',
          timeOut: 6000,
          showProgressBar: false
        });
      });
    }else{
      this.notifications.create('Error Email', 'Email debe ser una dirección institucional ej: jose.fonseca@est.umet.edu.ec!', NotificationType.Bare, {
        theClass: 'outline primary',
        timeOut: 6000,
        showProgressBar: false
      });
    }

  }

  // consultarUsuario() {
  //   const {rol} = this.registerForm.value;
  //   if (rol) {
  //     this.authService.getDatosEmpleado(rol).then(result => {
  //       if (result) {
  //         console.log('result',result)
  //         this.registerForm.setValue({
  //           rol, name: result.NOMB_EMPL, email: result.E_MAIL, password: null
  //         });
  //         this.passDisable = false;
  //         this.buttonDisabled = false;
  //       } else {
  //
  //       }
  //     }).catch(({error}) => {
  //       this.buttonDisabled = false;
  //       this.buttonState = '';
  //       this.notifications.create('Error', error.message, NotificationType.Bare, {
  //         theClass: 'outline primary',
  //         timeOut: 6000,
  //         showProgressBar: false
  //       });
  //     });
  //   }
  // }
}
