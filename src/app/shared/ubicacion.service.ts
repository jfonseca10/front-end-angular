import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class UbicacionService {

  constructor(private http: HttpClient) {
  }

  crearUbicacion(model) {
    return this.http.post<any>(`${apiUrl}/ubicacion/createUbicacion`, model).toPromise();
  }

  obtenerUbicaciones() {
    return this.http.get<any>(`${apiUrl}/ubicacion/listaUbicacion`).toPromise();
  }


  actualizarUbicacion(idubicacion, model) {
    return this.http.post<any>(`${apiUrl}/ubicacion/actualizarUbicacion/${idubicacion}`, model).toPromise();
  }

  eliminarUbicacion(idubicacion) {
    return this.http.post<any>(`${apiUrl}/ubicacion/eliminarUbicacion`, {idubicacion}).toPromise();
  }

}
