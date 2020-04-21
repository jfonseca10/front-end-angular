import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { formatDate } from "ngx-bootstrap";

const {apiUrl} = environment

export interface ICreateActividad {
  rol: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface ICreateDetalleActividad {
  actividadId: string;
  descripcionActividad: string;
  fechaFin: string;
  fechaInicio: string;
  observacionActividad: string;
  productoDigitalEntregable: string;
  avancePorcentaje: string;
  referenciaActividad: string;
}

@Injectable()
export class ActividadesService {

  constructor(private http: HttpClient) {
  }

  createActividad(actividades: ICreateActividad) {
    return this.http.post<any>(`${apiUrl}/actividades/createActividad`, actividades).toPromise();
  }

  createDetalleActividad(detalleActividades: ICreateDetalleActividad) {
    console.log('el detalle es:', detalleActividades)
    return this.http.post<any>(`${apiUrl}/actividades/createDetalleActividad`, detalleActividades).toPromise();
  }


  getActividades(rol) {
    return this.http.get<any>(`${apiUrl}/actividades/actividadesList`, {params: {rol}}).toPromise();
  }

  getActividadesDetalle(actividadId) {
    return this.http.get<any>(`${apiUrl}/actividades/actividadesDetalleList`, {params: {actividadId}}).toPromise();
  }

  updateDetalleActividad(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/updateDetalleActividad/${id}`, newObjeto).toPromise();
  }

  deleteDetalleActividad(detalleId) {
    return this.http.post<any>(`${apiUrl}/actividades/deleteDetalleActividad`, {detalleId}).toPromise();
  }


}
