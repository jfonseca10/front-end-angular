import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const {apiUrl} = environment

@Injectable()
export class EstudiantesTutorService {

  constructor(private http: HttpClient) {
  }

  crearEstudiantesByTutor(model) {
    return this.http.post<any>(`${apiUrl}/estudiantesByTutor/createEstudiantesByTutor`, model).toPromise();
  }

  obtenerEstudiantesByTutor(idtutoresbydistributivo) {
    console.log('service', idtutoresbydistributivo)
    return this.http.post<any>(`${apiUrl}/estudiantesByTutor/listaEstudiantesByTutor`, idtutoresbydistributivo).toPromise();
  }

  eliminarEstudiantesByTutor(idestudiantesbytutor) {
    console.log('service', idestudiantesbytutor)
    return this.http.post<any>(`${apiUrl}/estudiantesByTutor/eliminarEstudiantesByTutor`, {idestudiantesbytutor}).toPromise();
  }

}
