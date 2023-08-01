import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'pagos',
        loadChildren: () => import('../pagos/pagos.module').then(m => m.PagosPageModule)
      },
      {
        path: 'gastos',
        loadChildren: () => import('../gastos/gastos.module').then(m => m.GastosPageModule)
      },
      {
        path: 'corte',
        loadChildren: () => import('../corte/corte.module').then(m => m.CortePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/pagos',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
