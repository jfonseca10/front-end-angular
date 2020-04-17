import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { ActividadesService } from "../../../shared/actividades.service";
import { NgForm } from "@angular/forms";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DatePipe } from "@angular/common";
import { AuthService } from "../../../shared/auth.service";
import { TabsetComponent } from "ngx-bootstrap";
import * as moment from 'moment';

@Component({
  selector: 'app-actividades',
  templateUrl: 'actividades.component.html',
  providers: [ActividadesService, BrowserModule, CommonModule, DatePipe]
})

export class ActividadesComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild('actividadesForm') actividadesForm: NgForm;
  @ViewChild('actividadesDetalleForm') actividadesDetalleForm: NgForm;
  @ViewChild('activityTab') activityTab: TabsetComponent;
  @ViewChild('activityTable', {static: false}) table: DatatableComponent;
  buttonDisabled = false;
  actividadesColumns = [
    {
      name: 'Fecha Inicio Semana',
      prop: 'fechaInicio'
    }, {
      name: 'Fecha Fin Semana',
      prop: 'fechaFin'
    }, {
      name: 'Rol Jefatura',
      prop: 'rolAutorizador'
    }
  ];

  detalleActividadesColumns = [
    {
      name: 'Descripción',
      prop: 'descripcionActividad'
    },
    {
      name: 'Fecha Hora Inicio',
      prop: 'desdeDiaSemana'
    },
    {
      name: 'Fecha Hora Fin',
      prop: 'hastaDiaSemana'
    },
    {
      name: 'Producto Entregable',
      prop: 'productoDigitalEntregable'
    },
    {
      name: 'Referencia',
      prop: 'referenciaActividad'
    },
    {
      name: 'Observaciones',
      prop: 'observacionActividad'
    },
    {
      name: 'Avance %',
      prop: 'avancePorcentaje'
    }];

  loadingIndicator = false;
  detalleActividadesTmp = [];
  detalleActividades = [];
  actividades = [];
  rows = [];
  porcentajesAvances = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  reorderable: true;
  ColumnMode: ColumnMode;
  items: any;
  detalilSelected = null;
  fechaInicioSemana: any;
  fechaFinSemana: any;
  valorDetalle: any;
  buttonLabel = 'Agregar';

  constructor(private actividadesService: ActividadesService, private datePipe: DatePipe, private notifications: NotificationsService, private commonModule: CommonModule, private authService: AuthService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  renderDateToStr(date) {
    return moment(date).utc().format('YYYY-MM-DD')
  }

  renderDateToStrHours(date) {
    return moment(date).utc().format('YYYY-MM-DD HH:mm')
  }

  ngOnInit() {
    const {rol} = this.authService.currentUserValue;
    this.actividadesService.getActividades(rol).then(result => {
      this.actividades = result
    });

  }

  onSubmit() {

    if (!this.actividadesForm.valid || this.buttonDisabled) {
      return;
    }
    console.log('loos valores:', this.actividadesForm.value);
    this.actividadesService.createActividad(this.actividadesForm.value).then(result => {
      const {rol} = result
      this.actividadesService.getActividades(rol).then(result => {
        this.actividades = result;
        this.actividadesForm.resetForm();

      });
    }).catch(({error}) => {
      this.buttonDisabled = false;
      // this.buttonState = '';
      console.log(error)
      // this.notifications.create('Error', error.message, NotificationType.Bare, {
      //   theClass: 'outline primary',
      //   timeOut: 6000,
      //   showProgressBar: false
      // });
    });

  }

  cancelar() {
    console.log('ingreo a cancelar');
    this.actividadesDetalleForm.resetForm();
    this.detalilSelected = null;
    this.buttonLabel = 'Agregar';
  }

  handleEdit(value, tabId: number) {
    this.activityTab.tabs[tabId].active = true;
    const {actividadId, fechaInicio, fechaFin} = value
    this.fechaInicioSemana = this.datePipe.transform(fechaInicio, 'yyyy/MM/dd')
    this.fechaFinSemana = this.datePipe.transform(fechaFin, 'yyyy/MM/dd')

    this.valorDetalle = actividadId
    this.actividadesService.getActividadesDetalle(actividadId).then(result => {
      this.detalleActividades = result
      this.detalleActividadesTmp = result

    });
  }


  agregarSemanal() {
    const value = this.bsRangeValue.toLocaleString();
    const rangoFechas = value.split(',');
    const fechaInicio = rangoFechas[0];
    const fechaFin = rangoFechas[1];
    const {rol} = this.authService.currentUserValue;
    const datos = {
      rol,
      fechaInicio,
      fechaFin
    }
    this.actividadesService.createActividad(datos).then(result => {
      console.log('fornt', result)
      this.actividadesService.getActividades(rol).then(result => {
        this.actividades = result;
        this.actividadesForm.resetForm();

      })
      this.notifications.create('Actividad Semanal', 'La actividad semanal fue creada exitosamente', NotificationType.Success, {
        theClass: 'outline primary',
        timeOut: 3000,
        showProgressBar: true
      })
    }).catch(({error}) => {
      this.notifications.create('Error', 'El rango de fechas es maximo de 7 dias y no se puede ingresar un dia que ya exista en el rango de su lista', NotificationType.Error, {
        theClass: 'outline primary',
        timeOut: 10000,
        showProgressBar: false
      });
    });

  }

  detailEdit(data) {
    this.buttonLabel = 'Actualizar';
    this.detalilSelected = data;
    this.actividadesDetalleForm.setValue({
      descripcion: data.descripcionActividad || null,
      observacion: data.observacionActividad || null,
      referencia: data.referenciaActividad || null,
      productoEntregable: data.productoDigitalEntregable || null,
      fechaInicio: data.desdeDiaSemana ? moment(data.desdeDiaSemana).utc().format('YYYY-MM-DDTHH:mm:ss') : null,
      fechaFin: data.hastaDiaSemana ? moment(data.hastaDiaSemana).utc().format('YYYY-MM-DDTHH:mm:ss') : null,
      porcentajeAvance: data.avancePorcentaje || null,
    })
  }

  handleDelete(row) {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.detalleActividadesTmp.filter(function (d) {
      let valid = false;
      for (let key in d) {
        if (!valid && d[key]) {
          valid = d[key].toLowerCase().indexOf(val) !== -1 || !val
        }
      }
      return valid
      // return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.detalleActividades = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  agregarDetalleActividad() {
    const actividadId = this.valorDetalle
    console.log(actividadId, 'JJJ')
    if (!this.actividadesDetalleForm.valid || this.buttonDisabled) {
      return;
    }
    const {
      descripcion, fechaFin, fechaInicio, observacion, porcentajeAvance,
      productoEntregable, referencia
    } = this.actividadesDetalleForm.value
    const objeto = {
      actividadId,
      descripcion,
      fechaFin,
      fechaInicio,
      observacion,
      porcentajeAvance,
      productoEntregable,
      referencia
    };
    if (!this.detalilSelected) {
      this.actividadesService.createDetalleActividad(objeto).then(result => {
        this.actividadesService.getActividadesDetalle(actividadId).then(result => {
          this.detalleActividadesTmp = result
          this.detalleActividades = result
          this.actividadesDetalleForm.resetForm();
        });

        this.notifications.create('Actividad Agregada', 'Se agrego correctamente', NotificationType.Success, {
          theClass: 'outline primary',
          timeOut: 3000,
          showProgressBar: true
        })
      })
    } else {
      console.log('send to edit', this.detalilSelected)
      const {
        detalleId, actividadId, desdeDiaSemana, hastaDiaSemana,
        descripcionActividad, productoDigitalEntregable, avancePorcentaje,
        aprobacionJefatura, observacionActividad, referenciaActividad,
        fechaAprobacion
      } = this.detalilSelected
      const objetoCompleto = this.detalilSelected

      const id = detalleId
      const newObjeto = {
        actividadId, desdeDiaSemana, hastaDiaSemana,
        descripcionActividad, productoDigitalEntregable, avancePorcentaje,
        aprobacionJefatura, observacionActividad, referenciaActividad,
        fechaAprobacion
      }

      this.actividadesService.updateDetalleActividad(id, objetoCompleto).then(result => {
        this.actividadesService.getActividadesDetalle(actividadId).then(result => {
          this.detalleActividades = result
          this.actividadesDetalleForm.resetForm();
        });
        this.detalilSelected = null;
        this.buttonLabel = 'Agregar';
      })
    }

  }
}
