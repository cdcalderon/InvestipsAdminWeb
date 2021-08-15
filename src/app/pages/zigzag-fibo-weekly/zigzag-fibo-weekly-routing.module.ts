import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZigzagFiboWeeklyDetailsComponent } from './zigzag-fibo-weekly-details/zigzag-fibo-weekly-details.component';
import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';
import { ZigzagSignalListComponent } from './zigzag-signal-list/zigzag-signal-list.component';

const routes: Routes = [
  {
    path: '',
    component: ZigzagFiboWeeklyComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ZigzagSignalListComponent,
      },
      {
        path: 'details/:signal-id',
        component: ZigzagFiboWeeklyDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZigzagFiboWeeklyRoutingModule {}
