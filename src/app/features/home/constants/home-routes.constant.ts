import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';


export enum CORE_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [{
    path: CORE_ROUTE_NAMES.BLANK,
    component: HomeComponent
  }
];
