import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [ 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/users',
    title: 'Gestión de usuarios',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];