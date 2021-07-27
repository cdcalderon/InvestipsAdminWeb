import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZigzagFiboWeeklyModule } from './zigzag-fibo-weekly/zigzag-fibo-weekly.module';

@NgModule({
  declarations: [AppComponent, TopNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ZigzagFiboWeeklyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
