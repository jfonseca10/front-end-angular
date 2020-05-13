import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";


const {apiUrl} = environment

export interface ICreateActividad {
  rol: string;
  name: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface ICreateDetalleActividad {
  actividadId: string;
  descripcionActividad: string;
  fechaInicio: Date;
  observacionActividad: string;
  productoDigitalEntregable: string;
  avancePorcentaje: string;
  referenciaActividad: string;
  etapaActividad: string;
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

  getActiDetaAutorizador(actividadId) {
    return this.http.get<any>(`${apiUrl}/actividades/actiDetaListAutorizador`, {params: {actividadId}}).toPromise();
  }

  updateDetalleActividad(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/updateDetalleActividad/${id}`, newObjeto).toPromise();
  }

  aprobacionAutorizador(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/aprobacionAutorizador/${id}`, newObjeto).toPromise();
  }

  devolverActiSoli(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/devolverActividadSemana/${id}`, newObjeto).toPromise();
  }

  devolverDetaSoli(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/devolverActividadDiaria/${id}`, newObjeto).toPromise();
  }

  enviarSemanaAprobacion(id, newObjeto) {
    return this.http.post<any>(`${apiUrl}/actividades/enviarSemanaAprobacion/${id}`, newObjeto).toPromise();
  }

  deleteDetalleActividad(detalleId) {
    return this.http.post<any>(`${apiUrl}/actividades/deleteDetalleActividad`, {detalleId}).toPromise();
  }

  deleteActividad(actividadId) {
    return this.http.post<any>(`${apiUrl}/actividades/deleteActividad`, {actividadId}).toPromise();
  }

  getReportExport(actividadId) {
    return this.http.get<any>(`${apiUrl}/actividades/actividadesExport`, {
      params: {actividadId}
      //@ts-ignore
      , responseType: 'blob'
    });
  }

  getReportExportByActividad(actividadId) {
    return this.http.get<any>(`${apiUrl}/actividades/actividadesExportReport`, {
      params: {actividadId}
      //@ts-ignore
      , responseType: 'blob'
    });
  }

}
