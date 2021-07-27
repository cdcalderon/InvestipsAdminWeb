import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';

const routes: Routes = [
  {
    path: '',
    component: ZigzagFiboWeeklyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZigzagFiboWeeklyRoutingModule {}
