import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class RegistroAsistenciasService {

  constructor(private http: HttpClient) {
  }

  inicioJornada(rol) {
    return this.http.post<any>(`${apiUrl}/registroAsistencia/crearAsistencia`, {rol}).toPromise();
  }

  finJornada(rol) {
    return this.http.post<any>(`${apiUrl}/registroAsistencia/finAsistencia`, {rol}).toPromise();
  }

  consultarRegistroAsistencias(rol, startDate, endDate) {
    return this.http.post<any>(`${apiUrl}/registroAsistencia/consultarRegistroAsistencias`, {rol, startDate, endDate
    }).toPromise();
  }


}
