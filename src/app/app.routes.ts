import { Routes } from '@angular/router';
import { Landing } from './landing';
export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'privacy',
    loadComponent: () => import('./legal').then((m) => m.LegalPage),
    data: { kind: 'privacy' },
  },
  {
    path: 'terms',
    loadComponent: () => import('./legal').then((m) => m.LegalPage),
    data: { kind: 'terms' },
  },
  { path: '**', redirectTo: '' },
];
