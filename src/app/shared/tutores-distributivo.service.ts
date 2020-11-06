import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class TutoresDistributivoService {

  constructor(private http: HttpClient) {
  }

  crearTutorByDistributivo(model) {
    return this.http.post<any>(`${apiUrl}/tutoresByDistributivo/createTutorByDistributivo`, model).toPromise();
  }

  obtenerTutoresByDistributivo(idcabdistributivo) {
    console.log('service',idcabdistributivo)
    return this.http.post<any>(`${apiUrl}/tutoresByDistributivo/listaTutoresByDistributivo`, idcabdistributivo).toPromise();
  }

  eliminarTutoresByDistributivo(idtutoresbydistributivo) {
    return this.http.post<any>(`${apiUrl}/tutoresByDistributivo/eliminarTutorByDistributivo`, {idtutoresbydistributivo}).toPromise();
  }

}
