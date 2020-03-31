import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs'

const {apiUrl} = environment

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface UserModel {
  id: string;
  email: string;
  name: string;
  username: string;
  token: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
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
  }

  register(credentials: ICreateCredentials) {

    return this.http.post<any>(`${apiUrl}/user/create`, credentials).toPromise();
  }

  sendPasswordEmail(email) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  resetPassword(credentials: IPasswordReset) {
    return from(this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword));
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

}
