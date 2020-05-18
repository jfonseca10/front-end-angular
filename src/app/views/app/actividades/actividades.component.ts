import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { ActividadesService } from "../../../shared/actividades.service";
import { NgForm } from "@angular/forms";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DatePipe } from "@angular/common";
import { AuthService } from "../../../shared/auth.service";
import { TabsetComponent } from "ngx-bootstrap";
import * as moment from 'moment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: 'app-actividades',
  templateUrl: 'actividades.component.html',
  providers: [ActividadesService, BrowserModule, CommonModule, DatePipe]
})

export class ActividadesComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  buttonState = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild('actividadesForm') actividadesForm: NgForm;
  @ViewChild('actividadesDetalleForm') actividadesDetalleForm: NgForm;
  @ViewChild('activityTab') activityTab: TabsetComponent;
  @ViewChild('activityTable', {static: false}) table: DatatableComponent;
  @ViewChild('cabActivityTable', {static: false}) cabtable: DatatableComponent;
  buttonDisabled = false;
  actividadesColumns = [
    {
      name: 'Fecha Inicio Semana',
      prop: 'fechaInicio'
    }, {
      name: 'Fecha Fin Semana',
      prop: 'fechaFin'
    }, {
      name: 'Estado',
      prop: 'estadoActividad'
    }
  ];
  detalleActividadesColumns = [
    {
      name: 'Descripción',
      prop: 'descripcionActividad'
    },
    {
      name: 'Dia Actividad',
      prop: 'diaSemana'
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
      name: 'Etapa',
      prop: 'etapaActividad'
    },
    {
      name: 'Estado',
      prop: 'aprobacionJefatura'
    }];

  loadingIndicator = true;
  detalleActividadesTmp = [];
  actividadesTmp = [];
  detalleActividades = [];
  actividades = [];
  rows = [];
  // porcentajesAvances = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  tareas = ['NO INICIADO', 'EN PROCESO', 'CULMINADO'];
  reorderable: true;
  ColumnMode: ColumnMode.force;
  items: any;
  detalilSelected = null;
  fechaInicioSemana: any;
  fechaFinSemana: any;
  valorDetalle: any;
  buttonLabel = 'Agregar';
  private descripcionActividad: any;

  constructor(private modalService: BsModalService, private actividadesService: ActividadesService, private datePipe: DatePipe, private notifications: NotificationsService, private commonModule: CommonModule, private authService: AuthService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  abrirModalCabActi(templateCabActi: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateCabActi, {class: 'modal-sm'});
  }

  abrirModalEnvioSemana(templateEnviarSemana: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateEnviarSemana, {class: 'modal-sm'});
  }


  confirm(row): void {
    const {detalleId, actividadId} = row
    this.message = 'Confirmed!';
    console.log('eliminar', detalleId)
    this.actividadesService.deleteDetalleActividad(detalleId).then(result => {
      console.log('rre', result)
      this.actividadesService.getActividadesDetalle(actividadId).then(result => {
        this.detalleActividadesTmp = result
        this.detalleActividades = result
        this.actividadesDetalleForm.resetForm();
      });

      this.notifications.create('Actividad Diaria Elimnada', 'Se elimino correctamente', NotificationType.Error, {
        theClass: 'outline primary',
        timeOut: 3000,
        showProgressBar: true
      })
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  renderDateToStr(date) {
    return moment(date).utc().format('YYYY-MM-DD')
  }

  renderDateToStrHours(date) {
    return moment(date).utc().subtract(5, 'hours').format('YYYY-MM-DD HH:mm')
  }

  ngOnInit() {
    const {rol} = this.authService.currentUserValue;
    this.actividadesService.getActividades(rol).then(result => {
      console.log('semales son: ', result)
      this.actividades = result
      this.actividadesTmp = result;
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
        this.actividadesTmp = result;
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
    this.actividadesDetalleForm.resetForm();
    this.detalilSelected = null;
    this.buttonLabel = 'Agregar';
  }

  handleEdit(value, tabId: number) {
    this.activityTab.tabs[tabId].active = true;
    const {actividadId, descripcionActividad, fechaInicio, fechaFin} = value
    this.fechaInicioSemana = this.datePipe.transform(fechaInicio, 'yyyy/MM/dd')
    this.fechaFinSemana = this.datePipe.transform(fechaFin, 'yyyy/MM/dd')
    this.descripcionActividad = descripcionActividad

    this.valorDetalle = actividadId

    this.actividadesService.getActividadesDetalle(actividadId).then(result => {
      this.detalleActividades = result
      this.detalleActividadesTmp = result

    });
  }

  downloadActividades() {
    if (this.valorDetalle) {
      this.actividadesService.getReportExport(this.valorDetalle).subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'report-actividad.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }
  }

  descargarReport(row) {
    const {actividadId} = row;
    console.log('row', actividadId)
    if (actividadId) {
      this.actividadesService.getReportExportByActividad(actividadId).subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        console.log('el blob', objectUrl);
        a.href = objectUrl;
        a.download = 'report-actividad.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }

  }

  agregarSemanal() {
    const value = this.bsRangeValue.toLocaleString();
    const rangoFechas = value.split(',');
    const fechaInicio = rangoFechas[0];
    const fechaFin = rangoFechas[1];
    const {rol, name} = this.authService.currentUserValue;
    const datos = {
      rol,
      name,
      fechaInicio,
      fechaFin
    }
    this.actividadesService.createActividad(datos).then(result => {
      console.log('fornt', result)
      this.actividadesService.getActividades(rol).then(result => {
        this.actividades = result;
        this.actividadesTmp = result;
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
    console.log('jose', data)
    this.buttonLabel = 'Actualizar';
    this.detalilSelected = data;
    this.actividadesDetalleForm.setValue({
      descripcionActividad: data.descripcionActividad || null,
      observacionActividad: data.observacionActividad || null,
      referenciaActividad: data.referenciaActividad || null,
      productoDigitalEntregable: data.productoDigitalEntregable || null,
      fechaInicio: data.diaSemana ? moment(data.diaSemana).utc().format('YYYY-MM-DD') : null,
      // fechaInicio: data.diaSemana ? moment(data.diaSemana).utc().format('YYYY-MM-DDTHH:mm:ss') : null,
      // avancePorcentaje: data.avancePorcentaje || null,
      etapaActividad: data.etapaActividad || null
    })
  }

  deleteActividadSemanal(row): void {
    const {actividadId} = row
    const rol = this.authService.currentUserValue.rol;
    this.message = 'Confirmed!';
    console.log('eliminar', actividadId)
    this.actividadesService.deleteActividad(actividadId).then(result => {
      console.log('rre', result)
      this.actividadesService.getActividades(rol).then(result => {
        this.actividadesTmp = result
        this.actividades = result
        this.actividadesForm.resetForm();
      });

      this.notifications.create('Actividad Semanal Eliminada', 'Se elimino correctamente', NotificationType.Alert, {
        theClass: 'outline primary',
        timeOut: 3000,
        showProgressBar: true
      })
    });
    this.modalRef.hide();
  }

  enviarSemana(row): void {
    const {actividadId} = row
    const rol = this.authService.currentUserValue.rol;
    this.actividadesService.enviarSemanaAprobacion(actividadId, row).then(result => {
      console.log('rre', result)
      this.actividadesService.getActividades(rol).then(result => {
        this.actividadesTmp = result
        this.actividades = result
        this.actividadesForm.resetForm();
      });
    });
    this.notifications.create('Actividad Semanal Enviada', 'Se envio correctamente', NotificationType.Success, {
      theClass: 'outline success',
      timeOut: 3000,
      showProgressBar: true
    });
    this.modalRef.hide();
  }

  noEnviarSemana(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  updateFilterActividad(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.actividadesTmp.filter(function (j) {
      let valid = false;
      for (let key1 in j) {
        if (!valid && j[key1]) {
          const tempCompare = typeof j[key1] === 'string' ? j[key1].toLowerCase() : j[key1].toString();
          valid = tempCompare.indexOf(val) !== -1 || !val
        }
      }
      return valid
      // return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.actividades = temp;

    // Whenever the filter changes, always go back to the first page
    this.cabtable.offset = 0;
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
    console.log(temp, 'ejjjj')

    // update the rows
    this.detalleActividades = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  agregarDetalleActividad() {
    const actividadId = this.valorDetalle;
    console.log('res', this.actividadesDetalleForm.valid);
    if (!this.actividadesDetalleForm.valid || this.actividadesForm.submitted) {
      this.notifications.create('Verifique los campos', 'La descripicion, fecha y porcentaje son obligatorios', NotificationType.Error, {
        theClass: 'outline primary',
        timeOut: 3000,
        showProgressBar: true
      });
      return;
    }
    const {
      descripcionActividad, fechaInicio, observacionActividad, avancePorcentaje,
      productoDigitalEntregable, referenciaActividad, etapaActividad
    } = this.actividadesDetalleForm.value

    console.log('frontjjj', this.actividadesDetalleForm.value)
    const objeto = {
      actividadId,
      descripcionActividad,
      fechaInicio,
      observacionActividad,
      avancePorcentaje,
      productoDigitalEntregable,
      referenciaActividad,
      etapaActividad
    };

    const fInicio = moment(this.fechaInicioSemana).utc().format('YYYY-MM-DD')
    const fFin = moment(this.fechaFinSemana).utc().format('YYYY-MM-DD')
    if (fechaInicio < fInicio || fechaInicio > fFin){
      this.notifications.create('Error Actividad', `No puede ingresar un registro fuera de la semana ${fInicio} y ${fFin}`, NotificationType.Error, {
        theClass: 'outline primary',
        timeOut: 6000,
        showProgressBar: true
      });
      return;
    }
    else {
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
          });
        }).catch(e => {
          this.notifications.create('Error Actividad', e.error, NotificationType.Error, {
            theClass: 'outline primary',
            timeOut: 6000,
            showProgressBar: true
          });
        })
      } else {
        const {detalleId} = this.detalilSelected
        this.actividadesService.updateDetalleActividad(detalleId, this.actividadesDetalleForm.value).then(result => {
          console.log('el ureslt update', result)
          this.actividadesService.getActividadesDetalle(actividadId).then(result => {
            this.detalleActividades = result
            this.actividadesDetalleForm.resetForm();
          });
          this.detalilSelected = null;
          this.buttonLabel = 'Agregar';
        });
        this.notifications.create('Actividad Modificada', 'Se modifico correctamente', NotificationType.Info, {
          theClass: 'outline primary',
          timeOut: 3000,
          showProgressBar: true
        })
      }
    }
  }


}
