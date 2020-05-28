import { environment } from "../../environments/environment.prod";

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
}

const data: IMenuItem[] = [

  {
    id: 'first-menu',
    icon: 'iconsminds-clock',
    label: 'Registro Asistencia',
    to: '/app/registro-asistencia'
  },
  {
    id: 'second-menu',
    icon: 'iconsminds-preview',
    label: 'Actividades',
    to: '/app/actividades'
  },
  {
    id: 'thirt-menu',
    icon: 'iconsminds-rename',
    label: 'Aprobaciones',
    to: '/app/aprobaciones'
  },
  {
    id: 'fourth-menu',
    icon: 'iconsminds-book',
    label: 'Manual Usuario',
    to: `${environment.apiUrl}/user/manualExport`,
    newWindow: true
  }
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
export default data;
