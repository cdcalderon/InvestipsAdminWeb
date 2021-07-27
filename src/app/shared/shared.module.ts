import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvChartContainerComponent } from '../tv-chart-container/tv-chart-container.component';
import { InvestipsChartComponent } from '../investips-chart/investips-chart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { SplitModule } from './split/split.module';

@NgModule({
  declarations: [TvChartContainerComponent, InvestipsChartComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, SplitModule],
  exports: [
    TvChartContainerComponent,
    InvestipsChartComponent,
    FlexLayoutModule,
    MaterialModule,
    SplitModule,
  ],
})
export class SharedModule {}
