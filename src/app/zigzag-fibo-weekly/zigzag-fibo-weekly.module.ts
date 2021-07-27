import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZigzagFiboWeeklyComponent } from './zigzag-fibo-weekly.component';
import { ZigzagFiboWeeklyRoutingModule } from './zigzag-fibo-weekly-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ZigzagFiboWeeklyComponent],
  imports: [ZigzagFiboWeeklyRoutingModule, CommonModule, SharedModule],
})
export class ZigzagFiboWeeklyModule {}
