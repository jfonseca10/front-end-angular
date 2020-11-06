import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {UbicacionService} from "../../../shared/ubicacion.service";
import {BsModalService, BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-edit-ubicacion',
  template: `
    <form #editarForm="ngForm" (ngSubmit)="actualizarUbicacion(editarForm)" novalidate>
      <div class="mt-4">
        <label>Descripción</label>
        <textarea
          class="form-control" rows="3" ngModel required #descripcion="ngModel"
          name="descripcion"></textarea>
      </div>
      <div class="mt-4">
        <label>Estado</label>
        <label class="w-100">
          <ng-select appearance="outline" [searchable]="false" bindLabel="regionName" ngModel required
                     #estado="ngModel"
                     name="estado"
          >
            <ng-option *ngFor="let item of estados" name="estado" [value]="item.value">
              {{item.label}}
            </ng-option>
          </ng-select>
        </label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary"
                (click)="handleCancel()">{{'pages.cancel' | translate }}</button>
        <button type="submit"
                class="btn btn-primary float-right">{{ 'Actualizar'}}
        </button>
      </div>
    </form>
  `
})

export class editUbicacionComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() data: {
    idubicacion: string,
    descripcion: string,
    estado: number
  };
  @Input() estados: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('editarForm', {static: true}) editarForm: any

  constructor(private ubicacionService: UbicacionService, private modalService: BsModalService) {

  }

  ngOnInit() {
    const {descripcion, estado} = this.data
    setTimeout(() => {
      this.editarForm.form.setValue({
        descripcion, estado
      })
    }, 200)
  }

  handleCancel() {
    this.cancel.emit();
  }

  actualizarUbicacion(editarForm) {
    const {idubicacion} = this.data
    const {descripcion, estado} = editarForm.value
    const model = {
      idubicacion,
      descripcion,
      estado
    }
    this.save.emit(model);
  }

}
