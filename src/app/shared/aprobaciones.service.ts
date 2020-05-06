import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class AprobacionesService {

  constructor(private http: HttpClient) {
  }

  getSolicitantes(rol) {
    return this.http.get<any>(`${apiUrl}/actividades/actividadesListAutorizador`, {params: {rol}}).toPromise();
  }

}
