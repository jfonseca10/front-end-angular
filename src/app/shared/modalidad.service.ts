import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {mod} from "ngx-bootstrap/chronos/utils";

const {apiUrl} = environment

@Injectable()
export class ModalidadService {

  constructor(private http: HttpClient) {
  }

  crearModalidad(model) {
    console.log(model)
    return this.http.post<any>(`${apiUrl}/modalidad/createModalidad`, model).toPromise();
  }

  obtenerModalidad() {
    return this.http.get<any>(`${apiUrl}/modalidad/listaModalidad`).toPromise();
  }

  actualizarModalidad(idmodalidad, model) {
    return this.http.post<any>(`${apiUrl}/modalidad/actualizarModalidad/${idmodalidad}`, model).toPromise();
  }

  eliminarModalidad(idmodalidad) {
    return this.http.post<any>(`${apiUrl}/modalidad/eliminarModalidad`, {idmodalidad}).toPromise();
  }
}
