import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { ZigzagFiboWeeklyModule } from './pages/zigzag-fibo-weekly/zigzag-fibo-weekly.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    PagesComponent,
    NoPageFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ZigzagFiboWeeklyModule,
    RecaptchaV3Module,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6Lc2tAIcAAAAAPAchYV06lok21ztj7I913LTh-2w',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
