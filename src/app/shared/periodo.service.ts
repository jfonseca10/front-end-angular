import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class PeriodoService {

  constructor(private http: HttpClient) {
  }

  crearPeriodo(model) {
    return this.http.post<any>(`${apiUrl}/periodo/createPeriodo`, model).toPromise();
  }

  obtenerPeriodo() {
    return this.http.get<any>(`${apiUrl}/periodo/listaPeriodo`).toPromise();
  }

  actualizarPeriodo(idperiodo, model) {
    return this.http.post<any>(`${apiUrl}/periodo/actualizarPeriodo/${idperiodo}`, model).toPromise();
  }

  eliminarPeriodo(idperiodo) {
    return this.http.post<any>(`${apiUrl}/periodo/eliminarPeriodo`, {idperiodo}).toPromise();
  }

}
