import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  { path: 'test', component: NoPageFoundComponent },
  {
    path: '',
    redirectTo: 'zigzag-fibo-weekly',
    pathMatch: 'full',
  },
  {
    path: 'zigzag-fibo-weekly',
    loadChildren: () =>
      import('./pages/zigzag-fibo-weekly/zigzag-fibo-weekly.module').then(
        (m) => m.ZigzagFiboWeeklyModule
      ),
  },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
