import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class EncuestaService {

  constructor(private http: HttpClient) {
  }

  crearEncuesta(model) {
    return this.http.post<any>(`${apiUrl}/encuesta/createEncuesta`, model).toPromise();
  }

  obtenerEncuesta() {
    return this.http.get<any>(`${apiUrl}/encuesta/listaEncuesta`).toPromise();
  }

  actualizarEncuesta(idencuesta, model) {
    return this.http.post<any>(`${apiUrl}/encuesta/actualizarEncuesta/${idencuesta}`, model).toPromise();
  }

  eliminarEncuesta(idencuesta) {
    return this.http.post<any>(`${apiUrl}/encuesta/eliminarEncuesta`, {idencuesta}).toPromise();
  }

}
