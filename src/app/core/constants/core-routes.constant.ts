import { Routes } from '@angular/router';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  OTHER = '**',
  NOT_FOUND = 'not-found'
}

export const ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    loadChildren: () => import('@app/features/home/home.module').then(m => m.HomeModule)
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND
  }
];
