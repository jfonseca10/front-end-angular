import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  crearUsuario(model) {
    return this.http.post<any>(`${apiUrl}/periodo/createPeriodo`, model).toPromise();
  }

  crearDocente(model) {
    return this.http.post<any>(`${apiUrl}/user/createDocente`, model).toPromise();
  }

  crearEstudiante(model) {
    return this.http.post<any>(`${apiUrl}/user/createEstudiante`, model).toPromise();
  }

  obtenerDocente() {
    return this.http.get<any>(`${apiUrl}/user/listaDocente`).toPromise();
  }

  obtenerEstudiante() {
    return this.http.get<any>(`${apiUrl}/user/listaEstudiante`).toPromise();
  }

  actualizarDocente(idusuario, model) {
    return this.http.post<any>(`${apiUrl}/user/actualizarDocente/${idusuario}`, model).toPromise();
  }

  actualizarEstudiante(idusuario, model) {
    return this.http.post<any>(`${apiUrl}/user/actualizarEstudiante/${idusuario}`, model).toPromise();
  }

  eliminarDocente(idusuario) {
    return this.http.post<any>(`${apiUrl}/user/eliminarDocente`, {idusuario}).toPromise();
  }

  eliminarEstudiante(idusuario) {
    return this.http.post<any>(`${apiUrl}/user/eliminarEstudiante`, {idusuario}).toPromise();
  }

}
