import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class CarreraService {

  constructor(private http: HttpClient) {
  }

  crearCarrera(model) {
    return this.http.post<any>(`${apiUrl}/carrera/createCarrera`, model).toPromise();
  }

  obtenerCarrera() {
    return this.http.get<any>(`${apiUrl}/carrera/listaCarrera`).toPromise();
  }

  actualizarCarrera(idcarrera, model) {
    return this.http.post<any>(`${apiUrl}/carrera/actualizarCarrera/${idcarrera}`, model).toPromise();
  }

  eliminarCarrera(idcarrera) {
    return this.http.post<any>(`${apiUrl}/carrera/eliminarCarrera`, {idcarrera}).toPromise();
  }

}
