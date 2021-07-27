import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestipsChartComponent } from './investips-chart/investips-chart.component';
import { TvChartContainerComponent } from './tv-chart-container/tv-chart-container.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestipsChartComponent,
    TvChartContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
