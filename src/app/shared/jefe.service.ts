import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

const {apiUrl} = environment;

@Injectable()
export class JefeService {

  constructor(private http: HttpClient) {
  }

  obtenerEmpleadosByJefatura(rol) {
    return this.http.get<any>(`${apiUrl}/jefe/listaEmpleadosByJefe`, {params: {rol}}).toPromise();
  }

  obtenerActividadesByEmpleadoByFecha(model) {
    console.log('service', model)
    return this.http.post<any>(`${apiUrl}/jefe/listaActividadesByEmpleado`, model).toPromise();
  }

}
