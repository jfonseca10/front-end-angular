import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class CabeceraDistributivoService {

  constructor(private http: HttpClient) {
  }

  crearCabDistributivo(model) {
    return this.http.post<any>(`${apiUrl}/cabDistributivo/createCabDistributivo`, model).toPromise();
  }

  obtenerCabDistributivo() {
    return this.http.get<any>(`${apiUrl}/cabDistributivo/listaCabDistributivo`).toPromise();
  }


  actualizarCabDistributivo(idcabdistributivo, model) {
    return this.http.post<any>(`${apiUrl}/cabDistributivo/actualizarCabDistributivo/${idcabdistributivo}`, model).toPromise();
  }

  eliminarCabDistributivo(idcabdistributivo) {
    return this.http.post<any>(`${apiUrl}/cabDistributivo/eliminarCabDistributivo`, {idcabdistributivo}).toPromise();
  }

  obtenerReporteDistributivo(idcabdistributivo) {
    console.log('service', idcabdistributivo)
    return this.http.post<any>(`${apiUrl}/cabDistributivo/reporteDistributivo`, {idcabdistributivo}).toPromise();
  }

}
