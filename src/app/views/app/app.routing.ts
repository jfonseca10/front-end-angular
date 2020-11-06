import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BlankPageComponent} from './blank-page/blank-page.component';


const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'ubicacion',
        loadChildren: () => import('./ubicacion/ubicacion.module').then(m => m.UbicacionModule),
      },
      {
        path: 'periodo',
        loadChildren: () => import('./periodo/periodo.module').then(m => m.PeriodoModule),
      },
      {
        path: 'modalidad',
        loadChildren: () => import('./modalidad/modalidad.module').then(m => m.ModalidadModule),
      },
      {
        path: 'tipo-tutoria',
        loadChildren: () => import('./tipo-tutoria/tipo-tutoria.module').then(m => m.TipoTutoriaModule),
      },
      {
        path: 'sede',
        loadChildren: () => import('./sede/sede.module').then(m => m.SedeModule),
      },
      {
        path: 'carrera',
        loadChildren: () => import('./carrera/carrera.module').then(m => m.CarreraModule),
      },
      {
        path: 'docente',
        loadChildren: () => import('./docente/docente.module').then(m => m.DocenteModule),
      },
      {
        path: 'estudiante',
        loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudianteModule),
      },
      {
        path: 'encuesta',
        loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaModule),
      },
      {
        path: 'Procesos',
        loadChildren: ''
      }, {
        path: 'cab-distributivo',
        loadChildren: () => import('./cab-distributivo/cab-distributivo.module').then(m => m.CabDistributivoModule),
      },
      {
        path: 'Busquedas',
        loadChildren: ''
      },
      {
        path: 'Reportes',
        loadChildren: ''
      },
      {
        path: 'Encuesta',
        loadChildren: ''
      },
      {
        path: 'registro-asistencia',
        loadChildren: () => import('./registro-asistencia/registro-asistencia.module').then(m => m.RegistroAsistenciaModule)
      },
      {
        path: 'actividades',
        loadChildren: () => import('./actividades/actividades.module').then(m => m.ActividadesModule)
      },
      {
        path: 'aprobaciones',
        // loadChildren: () => import('./aprobaciones/aprobaciones.module').then(m => m.AprobacionesModule)
      },
      {path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
      {path: '', pathMatch: 'full', redirectTo: 'vien'},
      {path: 'vien', loadChildren: () => import('./vien/vien.module').then(m => m.VienModule)},
      {
        path: 'second-menu',
        loadChildren: () => import('./second-menu/second-menu.module').then(m => m.SecondMenuModule)
      },
      {path: 'blank-page', component: BlankPageComponent,},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
