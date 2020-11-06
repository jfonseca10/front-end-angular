import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class SedeService {

  constructor(private http: HttpClient) {
  }

  crearSede(model) {
    return this.http.post<any>(`${apiUrl}/sede/createSede`, model).toPromise();
  }

  obtenerSede() {
    return this.http.get<any>(`${apiUrl}/sede/listaSede`).toPromise();
  }

  obtenerSedeAll() {
    return this.http.get<any>(`${apiUrl}/sede/listaSedeAll`).toPromise();
  }

  actualizarSede(idsede, model) {
    return this.http.post<any>(`${apiUrl}/sede/actualizarSede/${idsede}`, model).toPromise();
  }

  eliminarSede(idsede) {
    return this.http.post<any>(`${apiUrl}/sede/eliminarSede`, {idsede}).toPromise();
  }

}
