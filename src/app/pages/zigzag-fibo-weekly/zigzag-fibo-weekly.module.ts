import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';
import { ZigzagFiboWeeklyRoutingModule } from './zigzag-fibo-weekly-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ZigzagFiboWeeklyDetailsComponent } from './zigzag-fibo-weekly-details/zigzag-fibo-weekly-details.component';
import { ZigzagSignalListComponent } from './zigzag-signal-list/zigzag-signal-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ZigzagFiboWeeklyComponent,
    ZigzagFiboWeeklyDetailsComponent,
    ZigzagSignalListComponent,
  ],
  imports: [
    ZigzagFiboWeeklyRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class ZigzagFiboWeeklyModule {}
