import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';
import { ZigzagFiboWeeklyRoutingModule } from './zigzag-fibo-weekly-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ZigzagFiboWeeklyDetailsComponent } from './zigzag-fibo-weekly-details/zigzag-fibo-weekly-details.component';

@NgModule({
  declarations: [ZigzagFiboWeeklyComponent, ZigzagFiboWeeklyDetailsComponent],
  imports: [
    ZigzagFiboWeeklyRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class ZigzagFiboWeeklyModule {}
