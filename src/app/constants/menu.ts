import {app} from "firebase";
import {AuthGuard} from '../guards/auth.guard'

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  access?: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
}

const data: IMenuItem[] = [

  {
    id: 'first-menu',
    icon: 'iconsminds-wrench',
    label: 'ADMINISTRACIÓN',
    to: '',
    subs: [{
      icon: 'simple-icon-home',
      label: 'Site',
      to: '/app/ubicacion',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-minus',
      label: 'Modalidad',
      to: '/app/modalidad',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-ghost',
      label: 'Periodo',
      to: '/app/periodo',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-hourglass',
      label: 'Tipo Tutoria',
      to: '/app/tipo-tutoria',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-present',
      label: 'Sede',
      to: '/app/sede',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-magnifier',
      label: 'Carrera',
      to: '/app/carrera',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-user',
      label: 'Docentes',
      to: '/app/docente',
      access: 'permisoadmin:true'
    }, {
      icon: 'simple-icon-people',
      label: 'Estudiantes',
      to: '/app/estudiante',
      access: 'permisoadmin:true'
    }]
  },
  {
    id: 'second-menu',
    icon: 'iconsminds-dashboard',
    label: 'PROCESOS',
    to: '/app/registro-asistencia',
    subs: [{
      icon: 'simple-icon-social-vkontakte',
      label: 'Distributivo Tutorías',
      to: '/app/cab-distributivo'
    }, {
      icon: 'simple-icon-paper-plane',
      label: 'Encuesta y preguntas',
      to: '/app/encuesta',
      access: 'permisoadmin:true'
    }]
  },
  {
    id: 'thirt-menu',
    icon: 'iconsminds-preview',
    label: 'BUSQUEDAS',
    to: '/app/registro-asistencia'
  }, {
    id: 'four-menu',
    icon: 'iconsminds-monitor-analytics',
    label: 'REPORTES',
    to: '/app/registro-asistencia'
  }, {
    id: 'five-menu',
    icon: 'iconsminds-project',
    label: 'ENCUESTA',
    to: '/app/registro-asistencia'
  }
  // {
  //   id: 'second-menu1',
  //   icon: 'iconsminds-preview',
  //   label: 'Actividades',
  //   to: '/app/actividades'
  // },
  // {
  //   id: 'thirt-menu1',
  //   icon: 'iconsminds-rename',
  //   label: 'Aprobaciones',
  //   to: '/app/aprobaciones'
  // }
  // {
  //   id: 'location',
  //   icon: 'iconsminds-rename',
  //   label: 'Aprobaciones',
  //   to: '/app/location',
  //   subs: [{
  //     icon: 'simple-icon-paper-plane',
  //     label: 'countries',
  //     to: '/app/location/countries'
  //   }]
  // }
  // {
  //   id: 'vien',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.vien',
  //   to: '/app/vien',
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.start',
  //       to: '/app/vien/start'
  //     }
  //   ]
  // },
  // {
  //   id: 'second-menu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu.second-menu',
  //   to: '/app/second-menu',
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.second',
  //       to: '/app/second-menu/second'
  //     }
  //   ]
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: '/app/blank-page'
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://vien-docs.coloredstrategies.com/',
  //   newWindow: true
  // }
];
export default data
