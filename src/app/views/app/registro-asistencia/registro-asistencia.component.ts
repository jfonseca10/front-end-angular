import { Component, OnInit } from "@angular/core";
import { NotificationsService, NotificationType } from "angular2-notifications";
import { AuthService } from "../../../shared/auth.service";
import { RegistroAsistenciasService } from '../../../shared/registro-asistencias.service'
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  providers: [DatePipe]
})

export class RegistroAsistenciaComponent implements OnInit {

  btnSalida: boolean = true;
  btnIniciar: boolean = false;
  fechaInicio: any;
  fechaFin: any;

  constructor(private authService: AuthService, private notifications: NotificationsService, private registroAsistenciasService: RegistroAsistenciasService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

  }

  inicialJornada() {
    const {rol} = this.authService.currentUserValue
    this.registroAsistenciasService.inicioJornada(rol).then(result => {
      const {fechaHora} = result;
      setTimeout(() => {
        this.notifications.create('Hora de registro entrada', this.datePipe.transform(fechaHora, 'yyyy/MM/dd HH:mm:ss', 'GMT'), NotificationType.Success, {
          theClass: 'outline primary',
          timeOut: 10000,
          showProgressBar: false
        })
      }, 1000)
      this.btnIniciar = true
      this.btnSalida = false
    })
  }

  finalizarJornada() {
    const {rol} = this.authService.currentUserValue
    this.registroAsistenciasService.finJornada(rol).then(result => {
      const {fechaHora} = result;
      setTimeout(() => {
        this.notifications.create('Hora de registro salida', this.datePipe.transform(fechaHora, 'yyyy/MM/dd HH:mm:ss', 'GMT'), NotificationType.Alert, {
          theClass: 'outline primary',
          timeOut: 10000,
          showProgressBar: false
        })
      }, 1000)
      this.btnIniciar = false
      this.btnSalida = true
    })
  }


  btnConsultarAsistencias() {
    const {rol} = this.authService.currentUserValue;
    const dateStart = this.datePipe.transform(this.fechaInicio, 'yyyy/MM/dd HH:mm:ss', 'GMT-5');
    const dateEnd = this.datePipe.transform(this.fechaFin, 'yyyy/MM/dd HH:mm:ss', 'GMT-5');
  }
}
