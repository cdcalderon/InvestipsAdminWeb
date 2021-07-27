import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestipsChartComponent } from './investips-chart/investips-chart.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TvChartContainerComponent } from './tv-chart-container/tv-chart-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InvestipsChartComponent,
    TvChartContainerComponent,
    TopNavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
