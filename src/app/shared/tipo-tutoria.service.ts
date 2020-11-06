import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class TipoTutoriaService {

  constructor(private http: HttpClient) {
  }

  crearTipoTutoria(model) {
    return this.http.post<any>(`${apiUrl}/tipoTutoria/createTipoTutoria`, model).toPromise();
  }

  obtenerTipoTutoria() {
    return this.http.get<any>(`${apiUrl}/tipoTutoria/listaTipoTutoria`).toPromise();
  }

  actualizarTipoTutoria(idtipotutoria, model) {
    return this.http.post<any>(`${apiUrl}/tipoTutoria/actualizarTipoTutoria/${idtipotutoria}`, model).toPromise();
  }

  eliminarTipoTutoria(idtipotutoria) {
    return this.http.post<any>(`${apiUrl}/tipoTutoria/eliminarTipoTutoria`, {idtipotutoria}).toPromise();
  }

}
