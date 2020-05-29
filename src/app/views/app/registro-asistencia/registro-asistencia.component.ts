import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationsService, NotificationType } from "angular2-notifications";
import { AuthService } from "../../../shared/auth.service";
import { RegistroAsistenciasService } from '../../../shared/registro-asistencias.service'
import { DatePipe } from "@angular/common";
import * as moment from "moment";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  providers: [DatePipe]
})

export class RegistroAsistenciaComponent implements OnInit {

  btnSalida: boolean = false;
  btnIniciar: boolean = false;
  fechaInicio: any;
  fechaFin: any;
  tableAsistencias = true;
  registroAsistencias = [];
  registroAsistenciasTmp = [];
  loadingIndicator = true;
  registroAsistenciasColumns = [
    {
      name: 'Fecha y Hora',
      prop: 'fechaHora'
    },
    {
      name: 'Tipo de registro',
      prop: 'tipoRegistro'
    },
    {
      name: 'Generado',
      prop: 'generado'
    }
  ];
  reorderable: true;
  columnMode: ColumnMode.force;
  @ViewChild('tableAsistencias', {static: false}) table: DatatableComponent;

  constructor(private authService: AuthService, private notifications: NotificationsService, private registroAsistenciasService: RegistroAsistenciasService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

  }

  renderDateToStr(date) {
    return moment(date).utc().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss')
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
      this.btnIniciar = false
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
      this.btnSalida = false
    })
  }


  btnConsultarAsistencias() {
    this.tableAsistencias = false
    const {rol} = this.authService.currentUserValue;
    const dateStart = this.datePipe.transform(this.fechaInicio, 'yyyy/MM/dd 00:00:00');
    const dateEnd = this.datePipe.transform(this.fechaFin, 'yyyy/MM/dd 23:59:59');

    console.log('incio', dateStart)
    console.log('fin', dateEnd)

    this.registroAsistenciasService.consultarRegistroAsistencias(rol, dateStart, dateEnd).then(result => {
      console.log('resu', result)
      this.registroAsistencias = result
      this.registroAsistenciasTmp = result
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.registroAsistenciasTmp.filter(function (d) {
      let valid = false;
      for (let key in d) {
        if (!valid && d[key]) {
          valid = d[key].toLowerCase().indexOf(val) !== -1 || !val
        }
      }
      return valid
      // return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    console.log(temp, 'ejjjj')

    // update the rows
    this.registroAsistencias = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
