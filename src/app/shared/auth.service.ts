import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {from} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs'
import {Router} from '@angular/router'

const {apiUrl} = environment

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  apellidos: string;
  cedula: string;
  email: string;
  nombres: string;
  password: string;
  seudonimo: string;
  telefono: string;
}

export interface EnvioCorreo {
  email: string
}

export interface UserModel {
  email: string;
  idusuario: string;
  nombre: string;
  token: string;
  permissions: any;
}

export interface IPasswordReset {
  code: string;
  npwd: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) {
    this.currentSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentSubject.value;
  }

  signIn(credentials: ISignInCredentials) {
    return this.http.post<any>(`${apiUrl}/user/signin`, credentials).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentSubject.next(user);
      }
      return user;
    }))
  }


  signOut() {
    localStorage.removeItem('currentUser');
    this.currentSubject.next(null);
    this.router.navigate(['user/login']);
  }

  register(credentials: ICreateCredentials) {
    console.log('modelo', credentials)
    return this.http.post<any>(`${apiUrl}/user/create`, credentials).toPromise();
  }

  sendPasswordEmail(correoEnviado) {
    return this.http.post<any>(`${apiUrl}/user/verifyMail`, {email: correoEnviado}).toPromise();
  }

  verifyCode(code) {
    return this.http.post<any>(`${apiUrl}/user/verifyCode`, {code}).toPromise();
  }


  resetPassword(credentials: IPasswordReset) {
    return this.http.post<any>(`${apiUrl}/user/returnAction`, credentials).toPromise();
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  getDatosEmpleado(rol) {
    console.log('ingreso a servcio', rol)
    return this.http.get<any>(`${apiUrl}/user/getDatoEmpleado`, {params: {rol}}).toPromise();
  }

}
