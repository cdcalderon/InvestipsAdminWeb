import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'zigzag-fibo-weekly',
    pathMatch: 'full',
  },
  {
    path: 'zigzag-fibo-weekly',
    loadChildren: () =>
      import('./zigzag-fibo-weekly/zigzag-fibo-weekly.module').then(
        (m) => m.ZigzagFiboWeeklyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
